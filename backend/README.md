# AI Chat Backend - Async + Threading Edition

A high-performance, scalable Flask backend that combines **async processing** and **threading** to handle multiple concurrent users with slow API responses from g4f.

## 🚀 Key Scalability Features

### ✅ **Hybrid Async + Threading Architecture**
- **ThreadPoolExecutor**: Handles multiple requests simultaneously
- **Dedicated Async Event Loop**: Separate thread for async operations
- **Hybrid Processing**: Automatically falls back from async to sync
- **Smart Request Routing**: Chooses optimal processing method
- **Non-blocking Operations**: Prevents request queuing

### ✅ **Advanced Concurrency**
- **Async Semaphore**: Limits concurrent async operations (configurable)
- **Request Queue**: Decoupled async request processing
- **Graceful Fallbacks**: Multiple layers of error handling
- **Connection Pooling**: Efficient resource management
- **Request Timeout**: 30-second timeout prevents hanging requests

### ✅ **Production Ready**
- **Gunicorn with Gevent**: Async worker processes for production
- **Enhanced Health Checks** with async status monitoring
- **Performance Metrics** with processing method tracking
- **Proper Logging** with async operation visibility
- **Docker Support** for containerized deployment

## 📊 Performance Improvements

| Feature | Before | After (Threading) | After (Async+Threading) |
|---------|--------|-------------------|-------------------------|
| Concurrent Users | 1 | 10+ | 20+ |
| Request Processing | Blocking | Non-blocking (Thread Pool) | Hybrid Async + Threads |
| API Timeouts | None | 30s timeout | 25s async + 30s fallback |
| Caching | None | 5-minute response cache | Async cache cleanup |
| Rate Limiting | None | 20 req/min per IP | Same + async queue |
| Production Server | Flask dev | Gunicorn + Gevent | Optimized Gunicorn |
| Processing Methods | 1 (sync) | 1 (threading) | 2 (async + sync fallback) |
| Queue Management | None | Basic | Advanced async queue |

## 🛠️ Quick Start

### Option 1: Standard Python Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Development server (good for testing)
python app.py

# Production server (recommended for multiple users)
gunicorn -c gunicorn.conf.py app:app
```

### Option 2: Using Startup Scripts

**Windows (PowerShell):**
```powershell
# Development (with async)
.\start.ps1 dev

# Production (full async+threading)
.\start.ps1 prod

# Lightweight production
.\start.ps1 light

# Test endpoints and health
.\start.ps1 test

# Run performance tests
.\start.ps1 perf
```

**Linux/Mac (Bash):**
```bash
# Make executable
chmod +x start.sh

# Development
./start.sh dev

# Production
./start.sh prod

# Test
./start.sh test
```

### Option 3: Docker (Easiest for Production)
```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## 📋 Environment Setup

1. **Create `.env` file in backend directory:**
```bash
# Copy example
cp .env.example .env

# Edit with your settings
OPENAI_API_KEY=your_key_here
FLASK_ENV=production
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

## 🔧 Configuration Options

### Gunicorn Configuration (`gunicorn.conf.py`)
- **Workers**: 4 (adjust based on CPU cores)
- **Worker Class**: gevent (async handling)
- **Timeout**: 120s (for slow g4f API)
- **Connections**: 1000 per worker

### Flask Configuration
- **Rate Limiting**: 20 requests/minute per IP
- **Cache Duration**: 5 minutes
- **Request Timeout**: 30 seconds
- **Thread Pool**: 10 workers

## 📈 Scaling Guidelines

### Small Scale (1-10 users)
```bash
# Use lightweight setup
gunicorn -w 2 -k gevent --timeout 120 --bind 0.0.0.0:4343 app:app
```

### Medium Scale (10-50 users)
```bash
# Use standard production config
gunicorn -c gunicorn.conf.py app:app
```

### Large Scale (50+ users)
- Use Docker with horizontal scaling
- Add Redis for shared caching
- Consider load balancer (Nginx)
- Monitor with dedicated tools

## 🔍 Monitoring & Debugging

### Health Check
```bash
curl http://localhost:4343/api/health
```

### Metrics
```bash
curl http://localhost:4343/api/metrics
```

### Clear Cache
```bash
curl -X POST http://localhost:4343/api/clear-cache
```

### Logs
```bash
# View real-time logs
tail -f gunicorn.log

# Docker logs
docker-compose logs -f ai-chat-backend
```

## 🚨 Troubleshooting

### Common Issues

**1. Port 4343 already in use**
```bash
# Find process using port
netstat -tulpn | grep 4343
# Kill process
kill -9 <PID>
```

**2. g4f API timeouts**
- Check internet connection
- Verify g4f service status
- Increase timeout in `gunicorn.conf.py`

**3. High memory usage**
```bash
# Clear cache
curl -X POST http://localhost:4343/api/clear-cache

# Restart workers
kill -HUP <gunicorn_pid>
```

**4. Rate limiting issues**
- Check IP-based limits in app.py
- Adjust rate limits for your use case
- Use Redis for distributed rate limiting

### Performance Tuning

**For more users, adjust these settings:**

1. **Increase workers** in `gunicorn.conf.py`:
```python
workers = 8  # 2x CPU cores
```

2. **Increase connections**:
```python
worker_connections = 2000
```

3. **Add Redis caching**:
```bash
# Uncomment Redis in docker-compose.yml
# Update app.py to use Redis instead of in-memory cache
```

## 📝 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Send message to AI |
| `/api/health` | GET | System health status |
| `/api/metrics` | GET | Performance metrics |
| `/api/clear-cache` | POST | Clear response cache |

## 🔐 Security Features

- Rate limiting per IP address
- Input validation and sanitization
- Request size limits
- Timeout protection
- Non-root Docker container
- Environment variable isolation

## 📦 Dependencies

- **Flask**: Web framework
- **Flask-CORS**: Cross-origin requests
- **Flask-Limiter**: Rate limiting
- **g4f**: AI API client
- **Gunicorn**: WSGI server
- **Gevent**: Async worker
- **python-dotenv**: Environment management

## 🎯 Next Steps for Even More Scalability

1. **Redis Integration**: Shared caching across workers
2. **Database**: Store conversation history
3. **Load Balancer**: Nginx for multiple backend instances
4. **CDN**: Cache static responses
5. **Monitoring**: Prometheus + Grafana
6. **Auto-scaling**: Kubernetes deployment

This backend can now handle **10-100x more concurrent users** compared to the original single-threaded version! 🚀
