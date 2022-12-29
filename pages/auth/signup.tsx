import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card, CardContent, CardActions, TextField, Button, Link } from '@mui/material';
import { hash } from 'bcryptjs';

// Minimum passord characters to be valid password
const MIN_PASSWORD_CHARS = 6;

const SignUp = () => {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(MIN_PASSWORD_CHARS, "Password must contain at least ${MIN_PASSWORD_CHARS} characters")
      .required("Enter your password"),
    confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password does not match")
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      const password = values.password;
      const hashedPassword = await hash(password, 12);

      const payload = {
        email: values.email,
        name: values.name,
        password: hashedPassword,
      }

      const registerResponse = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (registerResponse.status === 201) {
        const payload = await registerResponse.json();
        console.log(payload); //TODO
        // On sucessful sign up, redirect to the home page
        router.push('/');
      }

      setSubmitting(false);
    },
  });

  const handleCancel = () => {
    formik.isSubmitting = false;
    formik.resetForm();
    router.push('/');
  }

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <Card className="card">
          <CardContent>
            <TextField
              id="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.name ? formik.errors.name : ""}
              error={formik.touched.name && Boolean(formik.errors.name)}
              margin="dense"
              variant="outlined"
              fullWidth
            />

            <TextField
              id="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.email ? formik.errors.email : ""}
              error={formik.touched.email && Boolean(formik.errors.email)}
              margin="dense"
              variant="outlined"
              fullWidth
            />

            <TextField
              id="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.password ? formik.errors.password : ""}
              error={formik.touched.password && Boolean(formik.errors.password)}
              margin="dense"
              variant="outlined"
              fullWidth
            />

            <TextField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              margin="dense"
              variant="outlined"
              fullWidth
            />

          </CardContent>

          <CardActions className="actions">
            <Button type="submit" color="primary" disabled={formik.isSubmitting}>
              Create Account
            </Button>
            <Button color="secondary" onClick={formik.handleReset}>
              Clear
            </Button>
            <Button type="button" color="error" disabled={formik.isSubmitting} onClick={handleCancel}>
              Cancel
            </Button>
          </CardActions>

        </Card>
      </form>
    </div>
  );
};

export default SignUp;