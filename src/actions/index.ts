import { defineAction } from "astro:actions";
import { z } from "astro:schema";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export const server = {
  contact: defineAction({
    accept: "json",
    input: schema,
    handler: async ({ name, email, message }) => {
      
      console.log("Contact form submitted", name, email, message);

      await fetch("https://formspree.io/f/mvgrrrvl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      return { success: true, data: { name, email, message } };
    },
  }),
};
