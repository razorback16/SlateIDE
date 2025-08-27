import { cn } from '@/lib/utils'

interface SlateLogoProps {
  className?: string
  width?: number
  height?: number
}

const SlateLogo = ({ className, width = 64, height = 64 }: SlateLogoProps) => {
  return (
    <div className={cn('transition-all duration-300 dark:brightness-110 dark:invert', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width={width}
        height={height}
        viewBox="288 -103 1024 1024"
        xmlSpace="preserve"
      >
        <desc>Slate IDE Logo</desc>
        <defs />
        <g transform="matrix(0.5 0 0 0.5 800 409)">
          <path
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(16,29,48)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" translate(-1024, -1024)"
            d="M 0 0 L 281.202 0 L 1763.79 0 L 2048 0 L 2048 286.18 L 2048 1756.6 L 2048 2048 L 1766.56 2048 L 280.268 2048 L 0 2048 L 0 1755.78 L 0 287.422 L 0 0 z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(0.5 0 0 0.5 1244.58 848.15)">
          <path
            style={{
              stroke: 'rgb(0,0,0)',
              strokeOpacity: 0,
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(255,255,255)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" translate(-1907.28, -1902.3)"
            d="M 1766.56 2048 C 1779.99 2045.5 1793.78 2044.88 1807.26 2042.32 C 1851.2 2033.64 1892.63 2015.25 1928.54 1988.49 C 1984.47 1946.88 2023.76 1886.71 2039.37 1818.77 C 2043.96 1798.14 2044.91 1777.42 2048 1756.6 L 2048 2048 L 1766.56 2048 z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(0.5 0 0 0.5 358.07 847.94)">
          <path
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(255,255,255)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" translate(-140.13, -1901.89)"
            d="M 0 1755.78 C 2.83337 1776.05 3.53661 1796.14 7.74022 1816.28 C 22.1941 1885.53 62.9964 1945.68 119.142 1988.01 C 155.517 2015.14 197.583 2033.65 242.161 2042.13 C 254.771 2044.6 267.744 2045.41 280.268 2048 L 0 2048 L 0 1755.78 z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(0.5 0 0 0.5 1240.94 -31.45)">
          <path
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(255,255,255)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" translate(-1905.89, -143.09)"
            d="M 1763.79 0 L 2048 0 L 2048 286.18 C 2044.76 272.642 2045.19 257.423 2042.81 243.528 C 2035.13 198.706 2015.3 154.787 1988.18 118.407 C 1946.46 62.9692 1886.54 24.0016 1818.94 8.34575 C 1800.69 4.10516 1782.27 2.68337 1763.79 0 z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(0.5 0 0 0.5 358.3 -31.14)">
          <path
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeDashoffset: 0,
              strokeLinejoin: 'miter',
              strokeMiterlimit: 4,
              fill: 'rgb(255,255,255)',
              fillRule: 'nonzero',
              opacity: 1,
            }}
            transform=" translate(-140.6, -143.71)"
            d="M 0 0 L 281.202 0 C 263.326 2.56976 245.675 4.23298 228.042 8.46047 C 160.664 24.5205 100.99 63.5624 59.2888 118.868 C 31.1584 156.37 12.4132 200.06 4.62016 246.287 C 2.35454 259.748 3.00131 274.273 0 287.422 L 0 0 z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1.57 0 0 1.57 800.59 410.08)">
          <g style={{}}>
            <g transform="matrix(0.5 0 0 0.5 -63.95 -76.94)">
              <path
                style={{
                  stroke: 'none',
                  strokeWidth: 1,
                  strokeDasharray: 'none',
                  strokeLinecap: 'butt',
                  strokeDashoffset: 0,
                  strokeLinejoin: 'miter',
                  strokeMiterlimit: 4,
                  fill: 'rgb(216,215,216)',
                  fillRule: 'nonzero',
                  opacity: 1,
                }}
                transform=" translate(-502.39, -878.56)"
                d="M 603.582 510.552 C 638.425 536.204 673.401 561.676 708.508 586.966 C 691.455 613.667 675.833 641.482 659.659 668.74 L 574.532 811.763 C 557.939 839.681 541.206 867.515 524.333 895.265 C 515.492 909.871 505.094 924.675 497.836 940.1 C 493.701 948.888 491.738 957.559 493.255 967.29 C 494.518 975.397 496.794 980.707 502.336 986.681 C 515.896 1001.3 548.148 1022.42 565.607 1035.39 C 602.964 1063.14 639.813 1091.59 677.364 1119.07 C 652.366 1161.74 627.072 1204.24 601.485 1246.56 L 592.24 1239.52 L 296.277 1020.39 C 349.284 934.046 401.741 847.361 453.645 760.346 L 603.582 510.552 z"
                strokeLinecap="round"
              />
            </g>
            <g transform="matrix(0.5 0 0 0.5 68.07 83.57)">
              <path
                style={{
                  stroke: 'none',
                  strokeWidth: 1,
                  strokeDasharray: 'none',
                  strokeLinecap: 'butt',
                  strokeDashoffset: 0,
                  strokeLinejoin: 'miter',
                  strokeMiterlimit: 4,
                  fill: 'rgb(216,215,216)',
                  fillRule: 'nonzero',
                  opacity: 1,
                }}
                transform=" translate(-766.44, -1199.58)"
                d="M 660.815 844.824 C 687.384 866.284 716.35 885.457 743.855 905.773 C 793.239 942.099 842.422 978.699 891.401 1015.57 C 915.71 1033.77 940.356 1051.59 964.306 1070.26 C 935.021 1118.53 905.994 1166.95 877.228 1215.53 L 678.914 1545.33 L 673.68 1554.33 C 640.269 1527.05 603.656 1502.24 568.576 1477.1 C 581.528 1458.12 592.886 1437.55 604.758 1417.86 L 682.143 1287.98 C 698.874 1260.09 715.2 1231.94 732.145 1204.18 C 743.101 1186.23 756.251 1167.8 765.108 1148.73 C 768.954 1140.45 770.86 1131.94 769.295 1122.82 C 767.919 1114.8 765.262 1108.91 759.697 1103.01 C 745.419 1087.86 718.864 1070.88 701.689 1058.1 C 662.798 1029.06 623.728 1000.26 584.482 971.701 C 610.157 929.548 635.602 887.255 660.815 844.824 z"
                strokeLinecap="round"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default SlateLogo
