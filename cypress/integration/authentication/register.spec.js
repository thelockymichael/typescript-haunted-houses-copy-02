describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:19006')
    cy.contains(/welcome to urbanex/i).as('titleText')

    cy.get('[data-testid="loginEmailInput"]').as('emailInput')
    cy.get('[data-testid="loginPasswordInput"]').as('passwordInput')
    cy.get('[data-testid="loginBtn"]').as('loginBtn')
    cy.get('[data-testid="navigateToRegisterBtn"]').as('registerBtn')
    // [END]
  })

  it('loads the login page', () => {
    cy.get('@titleText')
    cy.get('@emailInput')
    cy.get('@passwordInput')
    cy.get('@loginBtn')
    cy.get('@registerBtn')
  })

  it('navigate to register screne', () => {
    cy.get('@registerBtn').click()

    cy.contains(/register new user/i)
  })

  // it('display error when inputting email with wrong format', () => {
  //   // Navigate to register screen
  //   cy.get('@registerBtn').click()
  //   cy.contains(/register new user/i)
  //   // [END]

  //   cy.get('[data-testid="registerEmailInput"]').as('registerEmailInput')
  //   cy.get('[data-testid="registerPassword"]').as('registerPassword')
  //   cy.get('[data-testid="registerBtn"]').as('registerBtn')

  //   cy.get('@registerEmailInput').focus().type('sdadas.com')

  //   cy.get('@registerBtn').click()

  //   cy.contains(/the email address/i)

  //   cy.wait(10000)
  // })

  // it('display error when inputting email with wrong format', () => {
  //   // Navigate to register screen
  //   cy.get('@registerBtn').click()
  //   cy.contains(/register new user/i)
  //   // [END]

  //   cy.get('[data-testid="registerEmailInput"]').as('registerEmailInput')
  //   cy.get('[data-testid="registerPassword"]').as('registerPassword')
  //   cy.get('[data-testid="registerBtn"]').as('registerBtn')

  //   cy.get('@registerEmailInput').focus().type('sdadas.com')

  //   cy.get('@registerBtn').click()

  //   cy.contains(/the email address/i)
  // })

  it('display error when entering correctly formatted email, but wrong password', () => {
    // Navigate to register screen
    cy.get('@registerBtn').click()
    cy.contains(/register new user/i)
    // [END]

    cy.wait(4000)

    cy.get('[data-testid="registerEmailInput"]')
      .focus()
      .type('test@test.com')
      .should('have.value', 'test@test.com')

    cy.get('[data-testid="registerBtn"]').click()

    cy.contains(/the password must be/i)
  })
})

//   it('slide to register view', {retries: 7}, () => {
//     cy.get('@register').click()
//   })

//   it('try to register user with only email address', {retries: 7}, () => {
//     cy.get('@registerEmail').type('bad@test.com')

//     cy.get('@registerNewUserBtn').click()

//     cy.contains(/phone number must be/i)
//   })

//   it('try to register user with only email address', {retries: 7}, () => {
//     cy.get('@registerEmail').type('badtest.com')

//     cy.get('@registerNewUserBtn').click()

//     cy.contains(/email must be email type/i)
//   })

//   it(
//     'try to register new user with email, phone & fullname',
//     {retries: 7},
//     () => {
//       cy.get('@registerEmail').type('bad@test.com')
//       cy.get('@registerNumber').type('12345694448')
//       cy.get('@registerFullname').type('Bad Test')

//       cy.get('@registerNewUserBtn').click()

//       cy.contains(/password must have 8 characters/i)
//     }
//   )

//   it('try to register user with incorrect password', {retries: 7}, () => {
//     cy.get('@registerEmail').type('test@register.com')
//     cy.get('@registerNumber').type('123456789')
//     cy.get('@registerFullname').type('Test Register')
//     cy.get('@registerPassword').type('Test123')

//     cy.get('@registerNewUserBtn').click()
//     cy.contains(/password must have 8 characters/i)
//   })

//   it(
//     'try to register user with incorrect password confirm',
//     {retries: 7},
//     () => {
//       cy.get('@registerEmail').type('test@register.com')
//       cy.get('@registerNumber').type('123456789')
//       cy.get('@registerFullname').type('Test Register')
//       cy.get('@registerPassword').type('Test123456')
//       cy.get('@registerConfirmPassword').type('Test12345')

//       cy.get('@registerNewUserBtn').click()
//       cy.contains(/passwords do not match/i)
//     }
//   )

//   it('register new user with correct field values', {retries: 7}, () => {
//     cy.get('@registerEmail').type('test@register.com')
//     cy.get('@registerNumber').type('123456789')
//     cy.get('@registerFullname').type('Test Register')
//     cy.get('@registerPassword').type('Test123456')
//     cy.get('@registerConfirmPassword').type('Test123456')

//     cy.get('@registerNewUserBtn').click()

//     cy.wait(6000)
//     cy.contains(/create or join/i)

//     //   Go back to login screen
//     cy.get('[role="button"][aria-label="Verify Email, back"]').click()

//     cy.wait(10000)
//     cy.contains(/verify your email/i)

//     cy.get('[data-testid="logout"]').click()
//   })

//   it('Delete test@register.com user from firebase', () => {
//     cy.exec('node ./cypress/deleteTestRegisterUser.js', {
//       // user.email comes from a fixture file but you can use a simple string as well
//       env: {email: "test@register.com'"},
//     }).then((result) => {
//       console.log('stdout-232', result.stdout)

//       // delete user document under 'users' collection in Firestore
//       const opts = {recursive: true}
//       cy.callFirestore('delete', `users/${result.stdout}`, opts)
//     })
//   })
// })
