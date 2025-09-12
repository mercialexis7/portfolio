// Performance monitoring utility
class PerformanceMonitor {
  constructor() {
    this.metrics = {}
    this.observers = []
  }

  // Initialize performance monitoring
  init() {
    if (typeof window === 'undefined') return

    this.observeCoreWebVitals()
    this.observeNavigationTiming()
    this.observeResourceTiming()
  }

  // Observe Core Web Vitals
  observeCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          this.metrics.lcp = lastEntry.startTime
          console.log('LCP:', this.metrics.lcp)
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
        this.observers.push(lcpObserver)

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            this.metrics.fid = entry.processingStart - entry.startTime
            console.log('FID:', this.metrics.fid)
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
        this.observers.push(fidObserver)

        // Cumulative Layout Shift (CLS)
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0
          const entries = list.getEntries()
          entries.forEach((entry) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          this.metrics.cls = clsValue
          console.log('CLS:', this.metrics.cls)
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(clsObserver)
      } catch (e) {
        console.warn('Performance Observer not supported:', e)
      }
    }
  }

  // Observe Navigation Timing
  observeNavigationTiming() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0]
        if (navigation) {
          this.metrics.navigation = {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            totalTime: navigation.loadEventEnd - navigation.fetchStart
          }
          console.log('Navigation Timing:', this.metrics.navigation)
        }
      })
    }
  }

  // Observe Resource Timing
  observeResourceTiming() {
    if ('PerformanceObserver' in window) {
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            if (entry.duration > 1000) { // Log resources that take more than 1 second
              console.warn('Slow resource:', entry.name, entry.duration + 'ms')
            }
          })
        })
        resourceObserver.observe({ entryTypes: ['resource'] })
        this.observers.push(resourceObserver)
      } catch (e) {
        console.warn('Resource timing observation failed:', e)
      }
    }
  }

  // Get current metrics
  getMetrics() {
    return { ...this.metrics }
  }

  // Send metrics to analytics (if available)
  sendToAnalytics() {
    if (window._paq && this.metrics.lcp) {
      window._paq.push(['trackEvent', 'Performance', 'LCP', this.metrics.lcp.toFixed(2)])
    }
    if (window._paq && this.metrics.fid) {
      window._paq.push(['trackEvent', 'Performance', 'FID', this.metrics.fid.toFixed(2)])
    }
    if (window._paq && this.metrics.cls) {
      window._paq.push(['trackEvent', 'Performance', 'CLS', this.metrics.cls.toFixed(4)])
    }
  }

  // Cleanup observers
  destroy() {
    this.observers.forEach(observer => {
      if (observer && typeof observer.disconnect === 'function') {
        observer.disconnect()
      }
    })
    this.observers = []
  }
}

// Create singleton instance
const performanceMonitor = new PerformanceMonitor()

// Auto-initialize in production
if (import.meta.env.PROD) {
  performanceMonitor.init()

  // Send metrics after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.sendToAnalytics()
    }, 1000)
  })
}

export default performanceMonitor
