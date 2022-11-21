/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import DrawingStage, { IStageProps } from '../../src/components/DrawingStage'

const mockStageProps: IStageProps = {
  displayedRects: [],
  handleMouseDown: () => { },
  handleMouseMove: () => { },
  handleMouseUp: () => { },
}

describe('Initialize drawing stage', () => {
  beforeEach(() => { cy.mount(<DrawingStage {...mockStageProps} />) })
  it('should display a canvas element', () => {
    cy.get('canvas').should('be.visible')
  })
})
