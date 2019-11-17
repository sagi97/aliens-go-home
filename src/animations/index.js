import { keyframes } from 'styled-components';
import { gameHeight } from '../utils/constants';

export const Move = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(${gameHeight}px);
  }
`;
