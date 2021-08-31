describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:19006')
    cy.contains(/welcome to urbanex/i).as('titleText')

    cy.get('[data-testid="emailInput"]').as('emailInput')
    cy.get('[data-testid="passwordInput"]').as('passwordInput')
    cy.get('[data-testid="loginBtn"]').as('loginBtn')
    cy.get('[data-testid="registerBtn"]').as('registerBtn')

    // cy.get('[data-testid="loginBtn"]').as('login')
    // cy.get('[data-testid="registerBtn"]').as('register')
  })

  it('loads the login page', () => {
    cy.get('@titleText')
    cy.get('@emailInput')
    cy.get('@passwordInput')
    cy.get('@loginBtn')
    cy.get('@registerBtn')
  })

  it('display error when inputting email with wrong format', () => {
    // cy.get('@emailInput').focus().type('sdadas.com')
    cy.get('@emailInput').type('sdadas.com')

    cy.get('@loginBtn').click()

    cy.contains(/the email address/i)
  })
})

// Enter wrong email

// Correct email but correct password

// Enter with wrong credentials

// Enter with right credentials

//   it('loads the login page', {retries: 7}, () => {
//     cy.get('@vehologo')
//     cy.get('@email')
//     cy.get('@password')
//     cy.get('@login')
//     cy.get('@register')
//   })

//   it('display email error with empty input as required', () => {
//     cy.get('@login').click()

//     cy.contains(/email address/i)
//   })

//   // display error message when incorrect email
//   it('display error message when incorrect email', () => {
//     cy.get('@email').type('bad@actor.com')

//     cy.get('@login').click()

//     cy.contains(/password is invalid/i)
//   })

//   // display message with correct email & incorrect password

//   it('display message with correct email & incorrect password', () => {
//     cy.get('@email').type('test3@test.com')
//     cy.get('@password').type('test123')

//     cy.get('@login').click()

//     cy.contains(/password is invalid/i)
//   })

//   it('logs in successfully', () => {
//     cy.fixture('goodCredentials').then(({goodEmail, goodPassword}) => {
//       cy.get('@email').type(goodEmail)
//       cy.get('@password').type(goodPassword)
//       cy.get('@login').click()

//       cy.wait(6000)
//       cy.contains(/create or join/i)

//       //  Go back to login screen
//       cy.get('[role="button"][aria-label="Verify Email, back"]').click()

//       cy.wait(6000)
//       cy.contains(/verify your email/i)

//       cy.get('[data-testid="logout"]').click()
//     })
//   })
// })
