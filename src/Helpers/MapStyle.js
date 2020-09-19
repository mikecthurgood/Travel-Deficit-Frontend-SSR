import styled from 'styled-components'


const Map = styled.div`
  margin: 1rem auto;
  width: 100%;
  margin-top: 80px;

  svg {
    stroke: #fff;

    path {
      fill: #475E7F;
      cursor: pointer;
      outline: none;

      &:hover {
        fill:  #5B6C7C;
      }

      &:focus {
        fill: rgba(168,43,43,0.6);
      }

      &[aria-checked='true'] {
        fill: #e68b24;
        &:hover {
          fill:  #E59854;
        }
      }

      &[aria-current='true'] {
        fill: rgba(56,43,168,0.83);
      }

      &[id="nz-can"] {
        fill: rgba(56,43,168,0.6);
      }
    }
  }
  `

export default Map