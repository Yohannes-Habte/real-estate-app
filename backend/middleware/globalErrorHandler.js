const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errorMessage,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
