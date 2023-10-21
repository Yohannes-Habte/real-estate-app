// Global error handler function
const globalErrorHandler = (err, req, res, next) => {
  const statusCodeError = err.status || 500;
  const messageError = err.message || 'Something went wrong!';

  return res.status(statusCodeError).json({
    success: false,
    status: statusCodeError,
    message: messageError,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
