/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import ControlPanel, { IPanelProps } from '../../src/components/ControlPanel'
import { INITIAL_COLOR } from '../../src/utils/constants'

const mockPanelProps: IPanelProps = {
  color: INITIAL_COLOR,
  rectCount: 0,
  setColor: () => { },
  setDrawing: () => { },
  clearRects: () => { },
}

describe('Initialize panel component', () => {
  beforeEach(() => {
    cy.mount(<ControlPanel {...mockPanelProps} />)
  })
  it('element counter should display "0 rectangles"', () => {
    cy.get('p').should('have.text', '0 rectangles')
  })

  it('should display a color picker', () => {
    cy.get('.slider-picker').should('be.visible')
  })

  it('should display action togglers with "draw" and "remove" values. draw should show as "pressed"', () => {
    cy.get('button[aria-pressed=true]').should('have.value', 'draw')
    cy.get('button[aria-pressed=false]').should('have.value', 'remove')
  })

  it('should display a button to clear all rectangles', () => {
    cy.get('#clear-rects').should('have.text', 'Clear')
  })
})
