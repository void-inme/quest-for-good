
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Gaming-themed colors
				pixel: {
					blue: '#2563eb',
					green: '#10b981',
					gold: '#f59e0b',
					purple: '#8b5cf6',
					red: '#ef4444',
					dark: '#1e293b',
					light: '#f8fafc'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'level-up': {
					'0%': {
						transform: 'scale(1)',
						opacity: '1'
					},
					'50%': {
						transform: 'scale(1.2)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'quest-complete': {
					'0%': {
						transform: 'translateY(0) scale(1)',
						opacity: '1'
					},
					'50%': {
						transform: 'translateY(-10px) scale(1.05)',
						opacity: '0.9'
					},
					'100%': {
						transform: 'translateY(0) scale(1)',
						opacity: '1'
					}
				},
				'xp-gain': {
					'0%': {
						transform: 'translateY(0)',
						opacity: '0'
					},
					'50%': {
						transform: 'translateY(-20px)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(-40px)',
						opacity: '0'
					}
				},
				'pixel-glow': {
					'0%, 100%': {
						boxShadow: '0 0 5px #2563eb'
					},
					'50%': {
						boxShadow: '0 0 20px #2563eb, 0 0 30px #2563eb'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'level-up': 'level-up 0.6s ease-in-out',
				'quest-complete': 'quest-complete 0.5s ease-in-out',
				'xp-gain': 'xp-gain 1s ease-out',
				'pixel-glow': 'pixel-glow 2s ease-in-out infinite'
			},
			fontFamily: {
				'pixel': ['monospace']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
