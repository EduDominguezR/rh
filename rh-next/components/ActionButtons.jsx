import Link from 'next/link';

export default function ActionButtons({ buttons = [] }) {
  return (
    <div className="actions">
      {buttons.map((button) => {
        const className = [
          'btn',
          button.variant || 'light',
          button.small ? 'small' : '',
        ]
          .filter(Boolean)
          .join(' ');

        if (button.href) {
          return (
            <Link key={button.label} href={button.href} className={className}>
              {button.label}
            </Link>
          );
        }

        return (
          <button
            key={button.label}
            type="button"
            className={className}
            onClick={button.onClick === true ? undefined : button.onClick}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
}