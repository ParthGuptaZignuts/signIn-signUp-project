export const EmailValidator = (value: string) => {
  if (value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(value)) {
      return true
    }
    return 'Please enter a valid email address.'
  }
  return 'Email is required.'
}
export const PasswordValidator = (value: string) => {
  if (value) {
    if (value.length >= 8) {
      return true
    }
    return 'Password must be at least 8 characters long.'
  }
  return 'Password is required.'
}

export const nameValidationRule = (value: string) => {
  if (value && !/^[a-zA-Z ]+$/.test(value)) {
    return 'Only letters and spaces are allowed for the name field'
  }
  return true
}

export const cardNumberValidationRule = (value: string) => {
  if (value && !/^\d{16}$/.test(value)) {
    return 'Card number must be exactly 16 digits'
  }
  return true
}

export const cardCvvValidationRule = (value: string) => {
  if (value && !/^\d{3}$/.test(value)) {
    return 'CVV must be exactly 3 digits'
  }
  return true
}
