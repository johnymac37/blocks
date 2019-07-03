// @flow
import PropTypes from 'prop-types';
import * as React from 'react';

/**
 * @typedef {object} LinkProps
 * @property {string} href The target URL or URL fragment for the link.
 * @property {string} [target] Specifies where to display the linked URL.
 * @property {number | string} [tabIndex] Indicates if the link can be focused and if/where it participates in sequential keyboard navigation.
 * @property {string} [className] Additional class names to apply to the link.
 * @property {object} [style] Additional styles to apply to the link.
 */
type LinkProps = {
    href: string,
    target?: string,
    tabIndex?: number | string,
    className?: string,
    style?: Object,
    children: React.Node,
};

const reasonableUrlSchemeRegex = /^[a-z0-9]+:\/\//i;

/**
 * A wrapper around the `<a>` tag that offers a few security benefits:
 *
 * - Limited XSS protection. If the `href` starts with `javascript:` or `data:`, `http://` will be prepended.
 * - There is [reverse tabnabbing prevention](https://www.owasp.org/index.php/Reverse_Tabnabbing). If `target` is set, the `rel` attribute will be set to `noopener noreferrer`.
 *
 * Developers should use `Link` instead of `a` when possible.
 *
 * @augments React.StatelessFunctionalComponent
 * @param {LinkProps} props
 *
 * @example
 * import {UI} from '@airtable/blocks/ui';
 *
 * function MyLinkComponent() {
 *     return (
 *         <UI.Link href="https://example.com">
 *             Check out my homepage!
 *         </UI.Link>
 *     );
 * }
 */
const Link = (props: LinkProps) => {
    const rel = props.target ? 'noopener noreferrer' : null;

    const {href} = props;
    let sanitizedHref;
    if (href) {
        const hasScheme = href.indexOf('://') !== -1;
        if (!hasScheme) {
            sanitizedHref = href;
        } else if (
            reasonableUrlSchemeRegex.test(href) &&
            !/^javascript:/i.test(href) &&
            !/^data:/i.test(href)
        ) {
            sanitizedHref = href;
        } else {
            sanitizedHref = 'http://' + href;
        }
    }

    return (
        // eslint-disable-next-line airtable/noopener-noreferrer
        <a
            href={sanitizedHref}
            target={props.target}
            rel={rel}
            tabIndex={props.tabIndex}
            className={props.className}
            style={props.style}
        >
            {props.children}
        </a>
    );
};

Link.propTypes = {
    href: PropTypes.string.isRequired,
    target: PropTypes.string,
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
};

export default Link;