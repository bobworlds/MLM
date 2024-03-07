import {json, redirect} from '@shopify/remix-oxygen';
import {Form, useActionData} from '@remix-run/react';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Activation du compte'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  if (await context.session.get('customerAccessToken')) {
    return redirect('/account');
  }
  return json({});
}

/**
 * @param {ActionFunctionArgs}
 */
export async function action({request, context, params}) {
  const {session, storefront} = context;
  const {id, activationToken} = params;

  if (request.method !== 'POST') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  try {
    if (!id || !activationToken) {
      throw new Error('Missing token. The link you followed might be wrong.');
    }

    const form = await request.formData();
    const password = form.has('password') ? String(form.get('password')) : null;
    const passwordConfirm = form.has('passwordConfirm')
      ? String(form.get('passwordConfirm'))
      : null;

    const validPasswords =
      password && passwordConfirm && password === passwordConfirm;

    if (!validPasswords) {
      throw new Error('Passwords do not match');
    }

    const {customerActivate} = await storefront.mutate(
      CUSTOMER_ACTIVATE_MUTATION,
      {
        variables: {
          id: `gid://shopify/Customer/${id}`,
          input: {
            password,
            activationToken,
          },
        },
      },
    );

    if (customerActivate?.customerUserErrors?.length) {
      throw new Error(customerActivate.customerUserErrors[0].message);
    }

    const {customerAccessToken} = customerActivate ?? {};
    if (!customerAccessToken) {
      throw new Error('Could not activate account.');
    }
    session.set('customerAccessToken', customerAccessToken);

    return redirect('/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return json({error: error.message}, {status: 400});
    }
    return json({error}, {status: 400});
  }
}

export default function Activate() {
  /** @type {ActionReturnData} */
  const action = useActionData();
  const error = action?.error ?? null;

  return (
    <div className="account-activate">
      <h1>Activation du compte</h1>
      <p>Créer un mot de passe pour activer votre compte</p>
      <Form method="POST">
        <fieldset>
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Mot de passe"
            aria-label="Mot de passe"
            minLength={8}
            required
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <label htmlFor="passwordConfirm">Retaper votre mot de passe</label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            autoComplete="current-password"
            placeholder="Retaper votre mot de passe"
            aria-label="Retaper votre mot de passe"
            minLength={8}
            required
          />
        </fieldset>
        {error ? (
          <p>
            <mark>
              <small>{error}</small>
            </mark>
          </p>
        ) : (
          <br />
        )}
        <button
          className="bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full"
          type="submit"
        >
          Enregistrer
        </button>
      </Form>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/mutations/customeractivate
const CUSTOMER_ACTIVATE_MUTATION = `#graphql
  mutation customerActivate(
    $id: ID!,
    $input: CustomerActivateInput!,
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customerActivate(id: $id, input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

/**
 * @typedef {{
 *   error: string | null;
 * }} ActionResponse
 */

/** @typedef {import('@shopify/remix-oxygen').ActionFunctionArgs} ActionFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
