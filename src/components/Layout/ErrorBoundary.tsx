import React from "react";

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  { hasError: boolean }
> {
  state: { hasError: boolean } = { hasError: false };
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-pink-600">
          Something went wrong.
        </h1>
      );
    }
    return this.props.children;
  }
}
