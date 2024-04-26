import { SITE_NAME } from '@/config/const';

export const Footer = () => {
  return (
    <div className="container">
      <div className="container p-4 text-xs text-gray-400">
        <p>
          © 2021 {SITE_NAME}. Test project for learning purposes.{' '}
          <a href="https://github.com/floatrx/mern-chat" target="_blank" rel="noopener" className="text-blue-500">
            GitHub.
          </a>
        </p>
      </div>
    </div>
  );
};
