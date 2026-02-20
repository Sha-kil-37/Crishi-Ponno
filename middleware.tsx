// Checking auth

// if (!token) redirect('/login')

// Protecting routes
// Redirecting users
export default function middleware() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
  return null;
}
