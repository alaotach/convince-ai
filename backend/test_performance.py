#!/usr/bin/env python3
"""
Performance test script for the async+threading backend
Tests concurrent requests to measure scalability improvements
"""

import asyncio
import aiohttp
import time
import json
import statistics
from concurrent.futures import ThreadPoolExecutor
import argparse

class BackendPerformanceTester:
    def __init__(self, base_url="http://localhost:4343", max_workers=20):
        self.base_url = base_url
        self.max_workers = max_workers
        self.results = []
        
    async def send_request(self, session, request_id, use_async=True):
        """Send a single chat request"""
        start_time = time.time()
        
        payload = {
            "messages": [
                {"role": "user", "content": f"Test message {request_id} - are you a bot?"}
            ],
            "mode": "convince-ai",
            "roastLevel": 5,
            "useAsync": use_async
        }
        
        try:
            async with session.post(f"{self.base_url}/api/chat", json=payload) as response:
                if response.status == 200:
                    data = await response.json()
                    processing_time = time.time() - start_time
                    
                    return {
                        'request_id': request_id,
                        'success': True,
                        'response_time': processing_time,
                        'server_processing_time': data.get('processing_time', 0),
                        'processing_method': data.get('processing_method', 'unknown'),
                        'queue_size': data.get('queue_size', 0)
                    }
                else:
                    return {
                        'request_id': request_id,
                        'success': False,
                        'response_time': time.time() - start_time,
                        'error': f"HTTP {response.status}"
                    }
                    
        except Exception as e:
            return {
                'request_id': request_id,
                'success': False,
                'response_time': time.time() - start_time,
                'error': str(e)
            }
    
    async def test_concurrent_requests(self, num_requests=20, use_async=True):
        """Test multiple concurrent requests"""
        print(f"🧪 Testing {num_requests} concurrent requests (async={use_async})...")
        
        start_time = time.time()
        
        connector = aiohttp.TCPConnector(limit=100)
        timeout = aiohttp.ClientTimeout(total=60)
        
        async with aiohttp.ClientSession(connector=connector, timeout=timeout) as session:
            tasks = []
            for i in range(num_requests):
                task = self.send_request(session, i, use_async)
                tasks.append(task)
            
            results = await asyncio.gather(*tasks, return_exceptions=True)
            
        total_time = time.time() - start_time
        
        # Process results
        successful_results = [r for r in results if isinstance(r, dict) and r.get('success', False)]
        failed_results = [r for r in results if isinstance(r, dict) and not r.get('success', False)]
        exceptions = [r for r in results if isinstance(r, Exception)]
        
        print(f"✅ Completed in {total_time:.2f} seconds")
        print(f"📊 Success: {len(successful_results)}/{num_requests}")
        print(f"❌ Failed: {len(failed_results)}")
        print(f"💥 Exceptions: {len(exceptions)}")
        
        if successful_results:
            response_times = [r['response_time'] for r in successful_results]
            server_times = [r['server_processing_time'] for r in successful_results]
            
            print(f"⏱️  Response Times:")
            print(f"   Average: {statistics.mean(response_times):.2f}s")
            print(f"   Median:  {statistics.median(response_times):.2f}s")
            print(f"   Min:     {min(response_times):.2f}s")
            print(f"   Max:     {max(response_times):.2f}s")
            
            print(f"🖥️  Server Processing Times:")
            print(f"   Average: {statistics.mean(server_times):.2f}s")
            print(f"   Median:  {statistics.median(server_times):.2f}s")
            
            # Processing method breakdown
            methods = {}
            for r in successful_results:
                method = r.get('processing_method', 'unknown')
                methods[method] = methods.get(method, 0) + 1
            
            print(f"🔧 Processing Methods: {methods}")
        
        return {
            'total_time': total_time,
            'success_rate': len(successful_results) / num_requests,
            'avg_response_time': statistics.mean([r['response_time'] for r in successful_results]) if successful_results else 0,
            'throughput': len(successful_results) / total_time if total_time > 0 else 0
        }
    
    async def check_server_health(self):
        """Check if the server is running and healthy"""
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(f"{self.base_url}/api/health") as response:
                    if response.status == 200:
                        data = await response.json()
                        print("🏥 Server Health Check:")
                        print(f"   Status: {data.get('status')}")
                        print(f"   Version: {data.get('version')}")
                        print(f"   Async Thread: {data.get('async_processing', {}).get('async_thread_alive')}")
                        print(f"   Thread Pool: {data.get('thread_pool', {}).get('active_threads')}/{data.get('thread_pool', {}).get('max_workers')}")
                        print(f"   Cache Entries: {data.get('cache', {}).get('entries')}")
                        return True
                    else:
                        print(f"❌ Server health check failed: HTTP {response.status}")
                        return False
        except Exception as e:
            print(f"❌ Cannot connect to server: {e}")
            return False
    
    async def run_comprehensive_test(self):
        """Run a comprehensive performance test"""
        print("🚀 AI Chat Backend Performance Test")
        print("=" * 50)
        
        # Health check
        if not await self.check_server_health():
            print("🛑 Server is not healthy. Please start the backend first.")
            return
        
        print()
        
        # Test different scenarios
        scenarios = [
            (5, "Light load"),
            (10, "Medium load"),
            (20, "Heavy load"),
            (30, "Stress test")
        ]
        
        results = {}
        
        for num_requests, description in scenarios:
            print(f"\n📈 {description} - {num_requests} concurrent requests")
            print("-" * 40)
            
            # Test async processing
            async_result = await self.test_concurrent_requests(num_requests, use_async=True)
            
            print()
            
            # Test sync processing
            sync_result = await self.test_concurrent_requests(num_requests, use_async=False)
            
            results[description] = {
                'async': async_result,
                'sync': sync_result
            }
            
            print(f"\n📊 Comparison for {description}:")
            print(f"   Async Throughput: {async_result['throughput']:.2f} req/s")
            print(f"   Sync Throughput:  {sync_result['throughput']:.2f} req/s")
            print(f"   Improvement: {((async_result['throughput'] / sync_result['throughput']) - 1) * 100:.1f}%" if sync_result['throughput'] > 0 else "   Improvement: N/A")
            
            # Small delay between tests
            await asyncio.sleep(2)
        
        print("\n🎯 Final Summary")
        print("=" * 50)
        for scenario, data in results.items():
            print(f"{scenario}:")
            print(f"  Async: {data['async']['throughput']:.2f} req/s")
            print(f"  Sync:  {data['sync']['throughput']:.2f} req/s")

async def main():
    parser = argparse.ArgumentParser(description='Test AI Chat Backend Performance')
    parser.add_argument('--url', default='http://localhost:4343', help='Backend URL')
    parser.add_argument('--requests', type=int, default=20, help='Number of concurrent requests')
    parser.add_argument('--mode', choices=['health', 'simple', 'comprehensive'], default='comprehensive', help='Test mode')
    
    args = parser.parse_args()
    
    tester = BackendPerformanceTester(args.url)
    
    if args.mode == 'health':
        await tester.check_server_health()
    elif args.mode == 'simple':
        await tester.test_concurrent_requests(args.requests)
    else:
        await tester.run_comprehensive_test()

if __name__ == "__main__":
    asyncio.run(main())
