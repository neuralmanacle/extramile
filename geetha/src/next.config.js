module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://bhagavadgitaapi.in/slok:path*',
          },
        ]
      },
  };