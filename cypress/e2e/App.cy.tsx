describe('User can draw and remove squares from drawing stage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3002')
  })

  it('should increase the rectangles count on canvas click', () => {
    cy.get('canvas').click()
    cy.get('p').should('have.text', '1 rectangle')
  })

  it('should remove all rectangles when clicking "clear" button', () => {
    cy.get('canvas').click()
    cy.get('#clear-rects').click()
    cy.get('p').should('have.text', '0 rectangles')
  })

  it("pressing on minus button shouldn't draw a rectangle", () => {
    cy.get('button[aria-pressed=false]').click()
    cy.get('canvas').click()
    cy.get('p').should('have.text', '0 rectangles')
  })
})
