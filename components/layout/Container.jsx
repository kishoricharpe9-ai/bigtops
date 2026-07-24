export function Container({ className, children }) {
  return (
    <div className={['mx-auto w-[90%] max-w-[1440px]', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
