// import { Resend } from 'resend';

// export const prerender = false;

// function isValidEmail(email) {
//   return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
// }

// export async function POST({ request }) {
//   const resend = new Resend(import.meta.env.RESEND_API_KEY);

//   try {
//     const formData = await request.formData();
//     const name = formData.get('name')?.trim();
//     const email = formData.get('email')?.trim();
//     const message = formData.get('message')?.trim();

//     if (!name || !email || !message) {
//       return new Response(JSON.stringify({
//         success: false,
//         error: 'Por favor, completa todos los campos.'
//       }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     if (!isValidEmail(email)) {
//       return new Response(JSON.stringify({
//         success: false,
//         error: 'Por favor, ingresa un email válido.'
//       }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }

//     const data = await resend.emails.send({
//       from: 'onboarding@resend.dev',
//       to: [email], // Enviamos al email proporcionado en el formulario
//       reply_to: email, // Permitimos responder directamente al remitente
//       subject: 'Gracias por tu mensaje',
//       html: `
//         <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
//           <h1 style="color: #333;">¡Gracias por tu mensaje!</h1>
//           <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
//             <p>Hola ${name},</p>
//             <p>Hemos recibido tu mensaje:</p>
//             <p style="white-space: pre-wrap; background: #fff; padding: 15px; border-radius: 5px;">${message}</p>
//             <p>Nos pondremos en contacto contigo pronto.</p>
//           </div>
//         </div>
//       `
//     });

//     // Enviar una copia al administrador
//     await resend.emails.send({
//       from: 'onboarding@resend.dev',
//       to: ['tu-email@ejemplo.com'], // Cambia esto por tu email
//       reply_to: email,
//       subject: `Nuevo mensaje de ${name}`,
//       html: `
//         <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
//           <h1 style="color: #333;">Nuevo mensaje de contacto</h1>
//           <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
//             <p><strong>Nombre:</strong> ${name}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Mensaje:</strong></p>
//             <p style="white-space: pre-wrap;">${message}</p>
//           </div>
//         </div>
//       `
//     });

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   } catch (error) {
//     console.error('Error al enviar el email:', error);
//     return new Response(JSON.stringify({
//       success: false,
//       error: 'Error al enviar el mensaje. Por favor, intenta de nuevo.'
//     }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// }