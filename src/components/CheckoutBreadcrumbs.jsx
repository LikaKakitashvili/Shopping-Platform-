import React from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  { key: "cart", label: "Cart", path: "/cart" },
  { key: "details", label: "Details", path: "/shipping-info" },
  { key: "shipping", label: "Shipping", path: "/shipping-method" },
  { key: "payment", label: "Payment", path: "/payment" },
];

export default function CheckoutBreadcrumbs({ currentStep }) {
  const navigate = useNavigate();
  let foundCurrent = false;
  return (
    <nav className="checkout-breadcrumbs">
      {steps.map((step, i) => {
        if (step.key === currentStep) foundCurrent = true;
        const isCurrent = step.key === currentStep;
        const isPast = !foundCurrent;
        return (
          <React.Fragment key={step.key}>
            <span
              className={
                isCurrent
                  ? "checkout-breadcrumbs-current"
                  : isPast
                  ? "checkout-breadcrumbs-past"
                  : "checkout-breadcrumbs-next"
              }
              onClick={isPast ? () => navigate(step.path) : undefined}
              style={{ cursor: isPast ? "pointer" : "default" }}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && <span className="checkout-breadcrumbs-sep">&gt;</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
} 