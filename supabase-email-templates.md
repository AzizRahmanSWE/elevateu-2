# ElevateU - Supabase Email Templates

Go to **Supabase Dashboard → Authentication → Email Templates** and update each template with the following:

---

## 1. Confirm Signup Email

**Subject:** `Welcome to ElevateU! Confirm Your Email 🏋️`

**Body (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirm Your ElevateU Account</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 500px; width: 100%; border-collapse: collapse;">
          <!-- Logo & Header -->
          <tr>
            <td style="padding: 30px 40px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px 16px 0 0; text-align: center;">
              <div style="font-size: 32px; margin-bottom: 8px;">🏋️</div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(90deg, #a855f7, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                ElevateU
              </h1>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 14px;">Your Fitness Journey Starts Here</p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px; background-color: #111827; border-left: 1px solid #374151; border-right: 1px solid #374151;">
              <h2 style="margin: 0 0 16px; color: #ffffff; font-size: 24px; font-weight: 600;">
                Welcome, {{ .Email }}! 👋
              </h2>
              <p style="margin: 0 0 24px; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                You're just one step away from transforming your fitness journey with AI-powered workout plans tailored just for you.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 8px 0 24px;">
                    <a href="{{ .ConfirmationURL }}" 
                       style="display: inline-block; padding: 16px 32px; background: linear-gradient(90deg, #9333ea, #db2777); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 14px rgba(147, 51, 234, 0.4);">
                      ✨ Verify My Email
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Features Preview -->
              <div style="background-color: #1f2937; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px; color: #a855f7; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                  What's waiting for you:
                </p>
                <ul style="margin: 0; padding: 0 0 0 20px; color: #d1d5db; font-size: 14px; line-height: 1.8;">
                  <li>🎯 Personalized AI workout plans</li>
                  <li>📊 Track your progress over time</li>
                  <li>💪 Access to 500+ exercises</li>
                  <li>🏆 Achieve your fitness goals faster</li>
                </ul>
              </div>
              
              <p style="margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.5;">
                If you didn't create an account with ElevateU, you can safely ignore this email.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #0f172a; border-radius: 0 0 16px 16px; border: 1px solid #374151; border-top: none; text-align: center;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px;">
                © 2024 ElevateU. All rights reserved.
              </p>
              <p style="margin: 0; color: #4b5563; font-size: 11px;">
                You're receiving this because you signed up at ElevateU.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 2. Magic Link Email

**Subject:** `Your ElevateU Login Link 🔐`

**Body (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 500px; width: 100%; border-collapse: collapse;">
          <!-- Logo & Header -->
          <tr>
            <td style="padding: 30px 40px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px 16px 0 0; text-align: center;">
              <div style="font-size: 32px; margin-bottom: 8px;">🏋️</div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #a855f7;">ElevateU</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px; background-color: #111827; border-left: 1px solid #374151; border-right: 1px solid #374151;">
              <h2 style="margin: 0 0 16px; color: #ffffff; font-size: 24px; font-weight: 600;">
                Your Magic Login Link 🪄
              </h2>
              <p style="margin: 0 0 24px; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                Click the button below to securely sign in to your ElevateU account. This link expires in 1 hour.
              </p>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 8px 0 24px;">
                    <a href="{{ .ConfirmationURL }}" 
                       style="display: inline-block; padding: 16px 32px; background: linear-gradient(90deg, #9333ea, #db2777); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                      🔓 Sign In to ElevateU
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; color: #9ca3af; font-size: 13px;">
                If you didn't request this link, you can safely ignore this email.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #0f172a; border-radius: 0 0 16px 16px; border: 1px solid #374151; border-top: none; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                © 2024 ElevateU. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 3. Reset Password Email

**Subject:** `Reset Your ElevateU Password 🔑`

**Body (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 500px; width: 100%; border-collapse: collapse;">
          <!-- Logo & Header -->
          <tr>
            <td style="padding: 30px 40px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px 16px 0 0; text-align: center;">
              <div style="font-size: 32px; margin-bottom: 8px;">🏋️</div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #a855f7;">ElevateU</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px; background-color: #111827; border-left: 1px solid #374151; border-right: 1px solid #374151;">
              <h2 style="margin: 0 0 16px; color: #ffffff; font-size: 24px; font-weight: 600;">
                Reset Your Password 🔑
              </h2>
              <p style="margin: 0 0 24px; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                We received a request to reset your password. Click the button below to create a new password. This link expires in 1 hour.
              </p>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 8px 0 24px;">
                    <a href="{{ .ConfirmationURL }}" 
                       style="display: inline-block; padding: 16px 32px; background: linear-gradient(90deg, #9333ea, #db2777); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                      🔐 Reset My Password
                    </a>
                  </td>
                </tr>
              </table>
              
              <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <p style="margin: 0; color: #92400e; font-size: 13px;">
                  ⚠️ If you didn't request a password reset, please ignore this email or contact support if you're concerned about your account security.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #0f172a; border-radius: 0 0 16px 16px; border: 1px solid #374151; border-top: none; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                © 2024 ElevateU. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 4. Invite User Email

**Subject:** `You've Been Invited to ElevateU! 🎉`

**Body (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 500px; width: 100%; border-collapse: collapse;">
          <!-- Logo & Header -->
          <tr>
            <td style="padding: 30px 40px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px 16px 0 0; text-align: center;">
              <div style="font-size: 32px; margin-bottom: 8px;">🏋️</div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #a855f7;">ElevateU</h1>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 14px;">Your Fitness Journey Starts Here</p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px; background-color: #111827; border-left: 1px solid #374151; border-right: 1px solid #374151;">
              <h2 style="margin: 0 0 16px; color: #ffffff; font-size: 24px; font-weight: 600;">
                You're Invited! 🎉
              </h2>
              <p style="margin: 0 0 24px; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                Someone special has invited you to join ElevateU - the AI-powered fitness platform that helps you achieve your goals faster.
              </p>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 8px 0 24px;">
                    <a href="{{ .ConfirmationURL }}" 
                       style="display: inline-block; padding: 16px 32px; background: linear-gradient(90deg, #9333ea, #db2777); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                      🚀 Accept Invitation
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #0f172a; border-radius: 0 0 16px 16px; border: 1px solid #374151; border-top: none; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                © 2024 ElevateU. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

## 📋 How to Apply These Templates

1. Go to **Supabase Dashboard** → **Authentication** → **Email Templates**
2. Click on each template type (Confirm signup, Magic Link, etc.)
3. Update the **Subject** line
4. Paste the HTML into the **Body** field
5. Click **Save**

**Important:** Make sure to test each email by signing up with a real email address!
