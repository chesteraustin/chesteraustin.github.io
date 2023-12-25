const scienceImages = [
  {
    url: "https://lh3.googleusercontent.com/pw/ABLVV85S-Y0-YZbWfIwPfnXzGBSllQRPSktTy7wpN46blKUu13TtXLm3csnsA8iV3rMo2kC_ADPYBck2sCMlw2Qju5NdwpGLmtB0SPlxyVZ3cRL5bAosohjr-UTj2pRywJSATPtNdJWcxK70hD8zB9oWiQrE-Q=w1655-h931-s-no-gm?authuser=0",
    description: "3d-camp",
  },
  {
    url: "https://lh3.googleusercontent.com/pw/ABLVV84XAo86E-oQqnrVQYF9MqwACWiVidVHXndb5U1GA1P5nIupbRnfvyCNU3tRle-9DV-ToPTvNUEHTyt2p3hophrILLYPTNbDBnA9vtIZh1reYbHpeV5WwE_yLKxvbknR83zmjvPbgRE-dMTSHy36nrhaOA=w1532-h931-s-no-gm?authuser=0",
    description: "science-building",
  },
  {
    url: "https://lh3.googleusercontent.com/pw/ABLVV86C_HPRnd2d9Z0kWlzrXTSuKHdrmS516ChkMHfNQ_9nurz9dRAABfRQFWoSFbQictt7i1-PeHLrWaPS_9V1jo2GBDB3cKKMEWfIT4xAUpqrF0cC8ecv82y9c9i7QJopOcl9dVPpS4Q_uDGJJyVr1ifkHQ=w1655-h931-s-no-gm?authuser=0",
    description: "jpl",
  },
  {
    url: "https://lh3.googleusercontent.com/pw/ABLVV84flrjmk6bZnGmXs4NsTGCuPp-raRsltvxbiYa-jW_ZSpbpGDtaSCoCuAwYFUNJHaPpwkKXVoZmcWSUmx0Z6JmVsP1nyOokjvS386efUoZ3_3Zu0kYSJ2Vzp-prERDX-GzGJbPrdVXtNfM7YB7M3O2bnQ=w1655-h931-s-no-gm?authuser=0",
    description: "flight-projects-center",
  },
  {
    url: "https://lh3.googleusercontent.com/pw/ABLVV84Y57LgGhHlB9czR7FIDVe6sn9QhSiuC9QkkEGneI7GS7Fj5mwBNIVmg6E_4sgBbG_Mu2EhxpUWe16aVXY6CEhu4OyqFdNOoqiGJ6u7ePEcoV3OpIFuNkorokTWhjZsPoXlStMRrcIh7GpOzSP8rFWO5Q=w524-h931-s-no-gm?authuser=0",
    description: "road-runner",
  },
];

let outputString = "";
for (let i = 0; i < scienceImages.length; i++) {
  let htmlString = `
<div class="swiper-slide"><img class="swiper-lazy" data-src="${scienceImages[i].url}" alt="${scienceImages[i].description}" title="${scienceImages[i].description}" />
    <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
</div>`;
  outputString = `${outputString}${htmlString}`;
}
console.log(outputString);
