# Gunicorn configuration for production deployment with async support

# Server socket
bind = "0.0.0.0:4343"
backlog = 2048

# Worker processes - optimized for async+threading hybrid
workers = 6  # Increased for async workload
worker_class = "gevent"  # Use gevent for async handling
worker_connections = 1500  # Increased for async processing
max_requests = 2000  # Increased for better worker recycling
max_requests_jitter = 100  # Add randomness to prevent all workers restarting at once

# Timeouts - extended for slow g4f API responses
timeout = 180  # Extended timeout for slow g4f operations (3 minutes)
keepalive = 5  # Slightly longer keepalive
graceful_timeout = 60  # More time for graceful shutdown

# Logging
loglevel = 'info'
accesslog = '-'  # Log to stdout
errorlog = '-'   # Log to stderr
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(D)s [%(p)s]'

# Process naming
proc_name = 'ai_chat_backend_async'

# Server mechanics
daemon = False
pidfile = '/tmp/gunicorn_async.pid'
user = None
group = None
tmp_upload_dir = None

# SSL (uncomment and configure for HTTPS)
# keyfile = "/path/to/keyfile"
# certfile = "/path/to/certfile"

# Performance tuning for async workloads
preload_app = True  # Load application code before forking workers
enable_stdio_inheritance = True

# Worker recycling - adjusted for async processing
max_worker_memory = 300  # MB - increased for async operations
worker_tmp_dir = "/dev/shm"  # Use tmpfs for better performance

# Async-specific settings
worker_max_requests = 2000
worker_max_requests_jitter = 100

def when_ready(server):
    """Called just after the server is started."""
    server.log.info("AI Chat Backend is ready to serve requests")

def worker_int(worker):
    """Called just after a worker exited on SIGINT or SIGQUIT."""
    worker.log.info("Worker received INT or QUIT signal")

def pre_fork(server, worker):
    """Called just before a worker is forked."""
    server.log.info("Worker spawned (pid: %s)", worker.pid)

def post_fork(server, worker):
    """Called just after a worker has been forked."""
    server.log.info("Worker spawned (pid: %s)", worker.pid)
