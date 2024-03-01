import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBurger,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import {Await, NavLink} from '@remix-run/react';
import {Suspense} from 'react';
import {useRootLoaderData} from '~/root';
import Logo from '../images/Logo.png';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart}) {
  const {shop, menu} = header;
  return (
    <header className="header">
      <div className="header__links">
        <NavLink
          prefetch="intent"
          to="/"
          style={activeLinkStyle}
          end
          className="header__links--logo"
        >
          <img src={Logo} alt="Logo Merci Le Merch" />
        </NavLink>
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
        />
      </div>
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      <hr />
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 * }}
 */
export function HeaderMenu({menu, primaryDomainUrl, viewport}) {
  const {publicStoreDomain} = useRootLoaderData();
  const className = `header-menu-${viewport}`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={closeAside}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Accueil
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink
        prefetch="intent"
        to="/"
        style={activeLinkStyle}
        end
        className="logomob"
      >
        <img src={Logo} alt="Logo Merci Le Merch" />
      </NavLink>
      <div className="header-icons">
        <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
          {isLoggedIn ? (
            <FontAwesomeIcon icon={faUser} />
          ) : (
            <FontAwesomeIcon icon={faUserAlt} />
          )}
        </NavLink>

        <CartToggle cart={cart} />
      </div>
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      {/* <h3>☰</h3> */}
      <FontAwesomeIcon icon={faBars} />
    </a>
  );
}

function SearchToggle() {
  return (
    <a href="#search-aside">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </a>
  );
}

/**
 * @param {{count: number}}
 */
function CartBadge({count}) {
  return (
    <a href="#cart-aside">
      <FontAwesomeIcon icon={faCartShopping} /> {count}
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    // color: isPending ? '#5F5F5F' : 'white',
  };
}

/** @typedef {Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>} HeaderProps */
/** @typedef {'desktop' | 'mobile'} Viewport */

/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('./Layout').LayoutProps} LayoutProps */
