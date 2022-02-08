export const Legend = ({ innerWidth, innerHeight }) => (
  <g id="legend">
    <g transform={`translate(${innerWidth - 150}, ${innerHeight / 2})`}>
      <rect x="0" y="-12" fill="#E6842A" height="16" width="16" />
      <text x="20" y="0">
        No doping allegations
      </text>
    </g>
    <g transform={`translate(${innerWidth - 150}, ${innerHeight / 2 + 25})`}>
      <rect x="0" y="-12" fill="#137B80" height="16" width="16" />
      <text x="20" y="0">
        Riders with doping allegations
      </text>
    </g>
  </g>
)
