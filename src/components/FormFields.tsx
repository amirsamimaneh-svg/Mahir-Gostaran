"use client";

import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";

const goldFocus = {
  onFocus: (e: { currentTarget: HTMLElement }) =>
    (e.currentTarget.style.borderColor = "var(--gold)"),
  onBlur: (e: { currentTarget: HTMLElement }) =>
    (e.currentTarget.style.borderColor = "var(--border)"),
};

function Label({
  label,
  required,
  htmlFor,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block mb-1.5 text-sm font-medium" style={{ color: "var(--fg)" }}>
      {label}
      {required && <span style={{ color: "var(--gold)" }}> *</span>}
    </label>
  );
}

function ErrorText({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <p className="mt-1.5 text-xs" style={{ color: "#F0A6A6" }}>
      {children}
    </p>
  );
}

const fieldStyle: React.CSSProperties = {
  background: "var(--bg)",
  border: "1px solid var(--border)",
  color: "var(--fg)",
};

export function TextField({
  label,
  error,
  id,
  ...props
}: { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label label={label} required={props.required} htmlFor={id!} />
      <input
        id={id}
        dir="auto"
        {...goldFocus}
        {...props}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
        style={fieldStyle}
      />
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

export function TextArea({
  label,
  error,
  id,
  ...props
}: { label: string; error?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <Label label={label} required={props.required} htmlFor={id!} />
      <textarea
        id={id}
        dir="auto"
        rows={3}
        {...goldFocus}
        {...props}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-y"
        style={fieldStyle}
      />
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

export function SelectField({
  label,
  error,
  id,
  placeholder,
  options,
  ...props
}: {
  label: string;
  error?: string;
  placeholder: string;
  options: string[];
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <Label label={label} required={props.required} htmlFor={id!} />
      <select
        id={id}
        {...goldFocus}
        {...props}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors appearance-none cursor-pointer"
        style={{
          ...fieldStyle,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23D6B25E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m4 6 4 4 4-4'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left 1rem center",
        }}
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ErrorText>{error}</ErrorText>
    </div>
  );
}
