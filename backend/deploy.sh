#!/bin/bash

# Convince AI Backend Deployment Script
# This script helps deploy the backend to a Linux server with systemd

echo "🚀 Convince AI Backend Deployment Script"
echo "========================================"

# Configuration
DEPLOY_USER="www-data"
DEPLOY_GROUP="www-data"
APP_DIR="/opt/convince"
BACKEND_DIR="$APP_DIR/backend"
VENV_DIR="$APP_DIR/venv"
SERVICE_NAME="convince-backend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        print_error "This script must be run as root (use sudo)"
        exit 1
    fi
}

# Create application directories
create_directories() {
    print_status "Creating application directories..."
    
    mkdir -p $APP_DIR
    mkdir -p $BACKEND_DIR
    mkdir -p /var/log/convince
    
    # Set ownership
    chown -R $DEPLOY_USER:$DEPLOY_GROUP $APP_DIR
    chown -R $DEPLOY_USER:$DEPLOY_GROUP /var/log/convince
    
    print_success "Directories created"
}

# Install system dependencies
install_system_deps() {
    print_status "Installing system dependencies..."
    
    apt update
    apt install -y python3 python3-pip python3-venv nginx curl wget htop
    
    print_success "System dependencies installed"
}

# Create Python virtual environment
create_venv() {
    print_status "Creating Python virtual environment..."
    
    # Create venv as the deploy user
    sudo -u $DEPLOY_USER python3 -m venv $VENV_DIR
    
    # Activate and install requirements
    sudo -u $DEPLOY_USER $VENV_DIR/bin/pip install --upgrade pip
    
    print_success "Virtual environment created"
}

# Install Python dependencies
install_python_deps() {
    print_status "Installing Python dependencies..."
    
    # Copy requirements if it exists
    if [ -f "requirements.txt" ]; then
        cp requirements.txt $BACKEND_DIR/
        chown $DEPLOY_USER:$DEPLOY_GROUP $BACKEND_DIR/requirements.txt
        
        sudo -u $DEPLOY_USER $VENV_DIR/bin/pip install -r $BACKEND_DIR/requirements.txt
    else
        print_warning "requirements.txt not found, installing essential packages..."
        sudo -u $DEPLOY_USER $VENV_DIR/bin/pip install flask flask-cors flask-limiter g4f gunicorn[gevent] python-dotenv aiohttp
    fi
    
    print_success "Python dependencies installed"
}

# Copy application files
copy_app_files() {
    print_status "Copying application files..."
    
    # Copy all backend files
    cp -r ./* $BACKEND_DIR/
    
    # Set proper ownership and permissions
    chown -R $DEPLOY_USER:$DEPLOY_GROUP $BACKEND_DIR
    chmod +x $BACKEND_DIR/start.sh
    
    # Make sure gunicorn config exists
    if [ ! -f "$BACKEND_DIR/gunicorn.conf.py" ]; then
        print_warning "gunicorn.conf.py not found, creating default..."
        cat > $BACKEND_DIR/gunicorn.conf.py << 'EOF'
bind = "0.0.0.0:4343"
workers = 4
worker_class = "gevent"
worker_connections = 1000
timeout = 180
keepalive = 5
max_requests = 1000
max_requests_jitter = 100
preload_app = True
EOF
        chown $DEPLOY_USER:$DEPLOY_GROUP $BACKEND_DIR/gunicorn.conf.py
    fi
    
    print_success "Application files copied"
}

# Install and configure systemd service
install_service() {
    print_status "Installing systemd service..."
    
    # Copy service file
    if [ -f "convince-backend.service" ]; then
        cp convince-backend.service /etc/systemd/system/
    else
        print_error "convince-backend.service file not found!"
        exit 1
    fi
    
    # Reload systemd and enable service
    systemctl daemon-reload
    systemctl enable $SERVICE_NAME
    
    print_success "Systemd service installed"
}

# Start the service
start_service() {
    print_status "Starting the service..."
    
    systemctl start $SERVICE_NAME
    
    # Check status
    if systemctl is-active --quiet $SERVICE_NAME; then
        print_success "Service started successfully!"
        systemctl status $SERVICE_NAME --no-pager -l
    else
        print_error "Service failed to start!"
        print_status "Checking logs..."
        journalctl -u $SERVICE_NAME --no-pager -l --since "5 minutes ago"
        exit 1
    fi
}

# Configure firewall (if ufw is available)
configure_firewall() {
    if command -v ufw &> /dev/null; then
        print_status "Configuring firewall..."
        ufw allow 4343/tcp
        print_success "Firewall configured"
    else
        print_warning "ufw not available, skipping firewall configuration"
    fi
}

# Test the deployment
test_deployment() {
    print_status "Testing deployment..."
    
    sleep 5  # Give the service time to start
    
    # Test health endpoint
    if curl -f -s http://localhost:4343/api/health > /dev/null; then
        print_success "Health check passed!"
        
        # Show response
        print_status "Health endpoint response:"
        curl -s http://localhost:4343/api/health | python3 -m json.tool
    else
        print_error "Health check failed!"
        print_status "Checking service logs..."
        journalctl -u $SERVICE_NAME --no-pager -l --since "5 minutes ago"
    fi
}

# Main deployment function
deploy() {
    print_status "Starting deployment process..."
    
    check_root
    create_directories
    install_system_deps
    create_venv
    install_python_deps
    copy_app_files
    install_service
    configure_firewall
    start_service
    test_deployment
    
    print_success "Deployment completed!"
    print_status "Service status:"
    systemctl status $SERVICE_NAME --no-pager
    
    echo ""
    print_status "Useful commands:"
    echo "  sudo systemctl status $SERVICE_NAME     # Check service status"
    echo "  sudo systemctl restart $SERVICE_NAME    # Restart service"
    echo "  sudo systemctl logs $SERVICE_NAME       # View logs"
    echo "  curl http://localhost:4343/api/health   # Test health endpoint"
}

# Quick troubleshooting function
troubleshoot() {
    print_status "Troubleshooting $SERVICE_NAME service..."
    
    echo ""
    print_status "Service Status:"
    systemctl status $SERVICE_NAME --no-pager -l
    
    echo ""
    print_status "Recent Logs:"
    journalctl -u $SERVICE_NAME --no-pager -l --since "10 minutes ago"
    
    echo ""
    print_status "Process Information:"
    ps aux | grep -E "(gunicorn|python.*app\.py)" || echo "No running processes found"
    
    echo ""
    print_status "Port Information:"
    netstat -tlnp | grep :4343 || echo "Port 4343 not listening"
    
    echo ""
    print_status "File Permissions:"
    ls -la $BACKEND_DIR/app.py 2>/dev/null || echo "app.py not found"
    ls -la $VENV_DIR/bin/gunicorn 2>/dev/null || echo "gunicorn not found in venv"
}

# Parse command line arguments
case "$1" in
    "deploy")
        deploy
        ;;
    "troubleshoot" | "debug")
        troubleshoot
        ;;
    "restart")
        print_status "Restarting service..."
        systemctl restart $SERVICE_NAME
        systemctl status $SERVICE_NAME --no-pager
        ;;
    "logs")
        journalctl -u $SERVICE_NAME -f
        ;;
    *)
        echo "Usage: $0 {deploy|troubleshoot|restart|logs}"
        echo ""
        echo "Commands:"
        echo "  deploy       - Full deployment process"
        echo "  troubleshoot - Debug service issues"
        echo "  restart      - Restart the service"
        echo "  logs         - Follow service logs"
        echo ""
        echo "Examples:"
        echo "  sudo $0 deploy           # Full deployment"
        echo "  sudo $0 troubleshoot     # Debug issues"
        echo "  sudo $0 restart          # Restart service"
        echo "  $0 logs                  # View logs (no sudo needed)"
        exit 1
        ;;
esac
