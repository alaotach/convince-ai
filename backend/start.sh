#!/bin/bash

# AI Chat Backend Startup Script
# This script provides different ways to run the backend

echo "🚀 AI Chat Backend Startup Script"
echo "=================================="

# Function to check if Python packages are installed
check_dependencies() {
    echo "📦 Checking dependencies..."
    python -c "import flask, flask_cors, g4f, gunicorn" 2>/dev/null
    if [ $? -ne 0 ]; then
        echo "❌ Missing dependencies. Installing..."
        pip install -r ../project/requirements.txt
        if [ $? -ne 0 ]; then
            echo "❌ Failed to install dependencies"
            exit 1
        fi
    else
        echo "✅ All dependencies are installed"
    fi
}

# Function to start development server
start_dev() {
    echo "🔧 Starting development server..."
    echo "   - Single threaded but with threading enabled"
    echo "   - Good for debugging and development"
    echo "   - Access at: http://localhost:4343"
    python app.py
}

# Function to start production server
start_production() {
    echo "🏭 Starting production server with Gunicorn..."
    echo "   - Multi-worker with gevent async handling"
    echo "   - Optimized for concurrent requests"
    echo "   - Access at: http://localhost:4343"
    gunicorn -c gunicorn.conf.py app:app
}

# Function to start lightweight production server
start_production_light() {
    echo "⚡ Starting lightweight production server..."
    echo "   - 2 workers for smaller deployments"
    echo "   - Good for low-medium traffic"
    echo "   - Access at: http://localhost:4343"
    gunicorn -w 2 -k gevent --timeout 120 --bind 0.0.0.0:4343 app:app
}

# Function to test the server
test_server() {
    echo "🧪 Testing server health..."
    curl -s http://localhost:4343/api/health | python -m json.tool
    echo ""
    echo "📊 Testing metrics endpoint..."
    curl -s http://localhost:4343/api/metrics | python -m json.tool
}

# Main menu
case "$1" in
    "dev")
        check_dependencies
        start_dev
        ;;
    "prod")
        check_dependencies
        start_production
        ;;
    "light")
        check_dependencies
        start_production_light
        ;;
    "test")
        test_server
        ;;
    *)
        echo "Usage: $0 {dev|prod|light|test}"
        echo ""
        echo "Commands:"
        echo "  dev    - Start development server (single process, debugging)"
        echo "  prod   - Start production server (multi-worker, high performance)"
        echo "  light  - Start lightweight production server (2 workers)"
        echo "  test   - Test server endpoints"
        echo ""
        echo "Examples:"
        echo "  $0 dev          # For development"
        echo "  $0 prod         # For production deployment"
        echo "  $0 light        # For small-scale production"
        echo "  $0 test         # Test if server is running"
        exit 1
        ;;
esac
