const critical = require('critical')

async function generateCriticalCSS() {
  try {
    await critical.generate({
      inline: true,
      base: 'dist/',
      src: 'index.html',
      target: 'index.html',
      width: 1300,
      height: 900,
      ignore: ['@font-face', /url\(/],
      minify: true,
      extract: false,
      dimensions: [
        {
          width: 320,
          height: 568
        },
        {
          width: 768,
          height: 1024
        },
        {
          width: 1300,
          height: 900
        }
      ]
    })

    console.log('✅ Critical CSS generated successfully!')
  } catch (error) {
    console.error('❌ Error generating critical CSS:', error)
    process.exit(1)
  }
}

// Run critical CSS generation
generateCriticalCSS()
