// Instagram video effect - Intersection Observer for mobile, hover for desktop

document.addEventListener('DOMContentLoaded', () => {
  const posts = document.querySelectorAll('.instagram-post')
  let unlocked = false

  // Safari unlock: play all videos briefly on first interaction
  function unlockVideos() {
    if (unlocked) return
    unlocked = true

    document.querySelectorAll('video[data-hover]').forEach((video) => {
      video
        .play()
        .then(() => {
          video.pause()
          video.currentTime = 0
        })
        .catch(() => {})
    })
  }

  // Unlock on first click, touch, or scroll anywhere on page
  document.addEventListener('click', unlockVideos, { once: true })
  document.addEventListener('touchstart', unlockVideos, {
    once: true,
    passive: true,
  })
  document.addEventListener('scroll', unlockVideos, {
    once: true,
    passive: true,
  })

  // Detect touch devices
  const isTouchDevice = () => window.matchMedia('(hover: none)').matches

  if (isTouchDevice()) {
    // Mobile/Tablet - Intersection Observer (like Instagram/TikTok)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('video[data-hover]')
          if (!video) return

          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
            video.currentTime = 0
          }
        })
      },
      { threshold: 1.0 } // Play when 100% of card is visible
    )

    posts.forEach((post) => observer.observe(post))
  } else {
    // Desktop - Hover effects
    posts.forEach((post) => {
      const video = post.querySelector('video[data-hover]')
      if (!video) return

      post.addEventListener('mouseenter', () => {
        video.play().catch(() => {})
      })

      post.addEventListener('mouseleave', () => {
        video.pause()
        video.currentTime = 0
      })
    })
  }
})

export {}
