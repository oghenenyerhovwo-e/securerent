// utils/validateInputField.ts


interface InputField {
    name: string;
    label: string;
    type: 'string' | 'email' | 'password' | 'confirmPassword' | 'array' | "number";
    minValue?: number,
    maxValue?: number,
}

const isPasswordSafe = (password: string) => {
  if (password.length < 8) {
      return false;
  }
}
  
export const checkInputFieldError = (
    field: InputField,
    value: any,
    allValues?: Record<string, any>,
  ): string | null => {
    const trimmedValue = typeof value === 'string' ? value.trim() : value;
  
    switch (field.type) {
      case 'string':
      case 'email':
      case 'password':
      case "number":
        if (!trimmedValue) return `${field.label} is required`;
        if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
          return `Invalid email format`;
        }
        return null;

      case "password":
        if(!isPasswordSafe(trimmedValue)){
            return "password must be at least 8 characters long and contain at least one capital letter, a special symbol and a number"
        };
  
      case 'confirmPassword':
        if (!trimmedValue) return `${field.label} is required`;
        if (trimmedValue !== allValues?.password) return `Passwords do not match`;
        return null;
  
      case 'array':
        if (!Array.isArray(value) || value.length === 0) return `${field.label} is required`;
        return null;

      case "number":
          if(field.minValue && (Number(trimmedValue) < field.minValue)) return`${field.label} must not be less than ${field.minValue}. `
          if(field.maxValue && (Number(trimmedValue) > field.maxValue)) return`${field.label} must not exceed ${field.maxValue}. `
          return null;

      default:
        return null;
    }
  };
  

  export const validateInputField = (requiredFields: any, form: any) => {
    const newErrors: any = {};
    let hasError: Boolean = false

    for (let field of requiredFields) {
        const error = checkInputFieldError(field, form[field.name], form);
        if (error) {
            newErrors[field.name] = error;
            hasError = true
        }
    }

    return {hasError, newErrors}
  }