// Temporary Auth Logic (Frontend-Only)
// Replace later with actual backend calls (e.g. Firebase, Supabase)

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function signUpUser(userData: UserData) {
  await new Promise((r) => setTimeout(r, 400));
  localStorage.setItem("temp_user", JSON.stringify({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password
  }));
  return { success: true, message: "User registered successfully" };
}

export async function verifyEmail(code?: string) {
  await new Promise((r) => setTimeout(r, 400));
  if (code && code.length === 6) {
    const isValid = code === "123456";
    if (isValid) {
      localStorage.setItem("temp_token", "mock_verified_token");
      return { success: true, message: "Email verified successfully" };
    } else {
      return { success: false, message: "Invalid verification code" };
    }
  }
  return { success: false, message: "Please enter the 6-digit code" };
}

export async function signInUser(email: string, password: string) {
  await new Promise((r) => setTimeout(r, 400));
  const userData = localStorage.getItem("temp_user");
  if (!userData) return { success: false, message: "User not found" };

  const user = JSON.parse(userData);
  const userEmail = user.email || user.userData?.email || user;
  const userPassword = user.password || user.userData?.password || user;
  
  if (userEmail === email && userPassword === password) {
    localStorage.setItem("temp_token", "mock_token_value");
    return { success: true, message: "Signed in successfully" };
  }
  return { success: false, message: "Incorrect email or password" };
}

export function signOutUser() {
  localStorage.removeItem("temp_token");
  return { success: true };
}

export function isAuthenticated() {
  return !!localStorage.getItem("temp_token");
}

export const fakeAuth = {
  getStatus: () => isAuthenticated()
};

export async function resendVerificationCode(email: string) {
  await new Promise((r) => setTimeout(r, 400));
  console.log(`Resending verification code to: ${email}`);
  return { success: true, message: "Verification code sent successfully" };
}

export async function verifyPasswordReset(code: string) {
  await new Promise((r) => setTimeout(r, 400));
  if (code === "123456") {
    localStorage.setItem("reset_token", "valid-reset-token");
    return { success: true, message: "Verification successful" };
  }
  return { success: false, message: "Invalid verification code" };
}

export async function sendPasswordResetEmail(email: string) {
  await new Promise((r) => setTimeout(r, 400));
  const userData = localStorage.getItem("temp_user");
  if (!userData) {
    return { success: false, message: "No account found with this email" };
  }
  console.log(`Password reset email sent to: ${email}`);
  return { success: true, message: "Reset email sent successfully" };
}

export async function updatePassword(email: string | null, newPassword: string, token: string | null) {
  await new Promise((r) => setTimeout(r, 400));
  if (!token || token !== "valid-reset-token") {
    return { success: false, message: "Invalid or expired reset token" };
  }
  const userData = localStorage.getItem("temp_user");
  if (userData) {
    const user = JSON.parse(userData);
    const updatedUser = { ...user, password: newPassword };
    localStorage.setItem("temp_user", JSON.stringify(updatedUser));
    console.log(`Password updated for: ${email}`);
    return { success: true, message: "Password updated successfully" };
  }
  return { success: false, message: "User not found" };
}