<template>
  <div class="page">
    <svg
      version="1.0"
      width="50"
      height="50"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <defs>
        <mask id="msk">
          <image
            id="logo-hanghang-mask2"
            width="100"
            height="100"
            xlink:href="data:img/png;base64,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"
          />
        </mask>
        <g id="logo-j">
          <path
            d="M35,31s-6.935-5.468-12,0-0.1,14,0,14,7.749,10.88,21-1-4-25-4-25-12.069-8.725-24,0S2.757,47.953,14,59C26.157,70.946,48.612,89.87,55,90"
          />
        </g>
        <g id="logo-d">
          <path
            d="M54,20l1,67V20c0.045-.038,15.27-15.151,32,2,5.508,5.718,7.625,17.01,4,24S84.373,70.375,55,91"
          />
        </g>
        <g id="logo-h1">
          <path d="M35,54L33,64" />
        </g>
        <g id="logo-h2">
          <path d="M34,59s26.512,11.928,36-9" />
        </g>
        <g id="logo-h3">
          <path d="M70,48l4,8" />
        </g>
      </defs>
      <use
        class="path-group path-group-1"
        xlink:href="#logo-j"
        x="0"
        y="0"
        mask="url(#msk)"
      />
      <use
        class="path-group path-group-2"
        xlink:href="#logo-d"
        x="0"
        y="0"
        mask="url(#msk)"
      />
      <use
        class="path-group h-group-1"
        xlink:href="#logo-h1"
        x="0"
        y="0"
        mask="url(#msk)"
      />
      <use
        class="path-group h-group-2"
        xlink:href="#logo-h2"
        x="0"
        y="0"
        mask="url(#msk)"
      />
      <use
        class="path-group h-group-3"
        xlink:href="#logo-h3"
        x="0"
        y="0"
        mask="url(#msk)"
      />
    </svg>
  </div>
</template>

<style>
.page {
  width: 100px;
  height: 100px;
}

.path-group {
  --j-len: 210;
  --d-len: 255;
  --h1-len: 11;
  --h2-len: 42;
  --h3-len: 9;

  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3px;

  stroke: #000000;
}

.dark .path-group {
  stroke: #ffffff;
}

.path-group-1 {
  stroke-dasharray: var(--j-len);
  stroke-dashoffset: var(--j-len);
  animation: stroke-j 3s linear 0.5s both infinite alternate;
}

.path-group-2 {
  stroke-dasharray: var(--d-len);
  stroke-dashoffset: var(--d-len);
  animation: stroke-d 3s linear 0.5s both infinite alternate;
}

.h-group-1 {
  stroke: red !important;
  stroke-dasharray: var(--h1-len);
  stroke-dashoffset: var(--h1-len);
  animation: stroke-h1 3s linear 0.5s both infinite alternate;
}

.h-group-2 {
  stroke: red !important;
  stroke-dasharray: var(--h2-len);
  stroke-dashoffset: var(--h2-len);
  animation: stroke-h2 3s linear 0.5s both infinite alternate;
}

.h-group-3 {
  stroke: red !important;
  stroke-dasharray: var(--h3-len);
  stroke-dashoffset: var(--h3-len);
  animation: stroke-h3 3s linear 0.5s both infinite alternate;
}

@keyframes stroke-j {
  0%,
  20% {
    stroke-dashoffset: var(--j-len);
  }
  80%,
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes stroke-d {
  0%,
  20% {
    stroke-dashoffset: var(--d-len);
  }
  80%,
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes stroke-h1 {
  0%,
  20% {
    stroke-dashoffset: var(--h1-len);
  }
  30%,
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes stroke-h2 {
  0%,
  30% {
    stroke-dashoffset: var(--h2-len);
  }
  70%,
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes stroke-h3 {
  0%,
  70% {
    stroke-dashoffset: var(--h3-len);
  }
  80%,
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
