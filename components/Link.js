/* @flow */
import NextLink from "next/link";
import React from "react";

type Props = {
  children?: any,
  href: string,
};

/**
 * The purpose of this component is to make it easier to use styled-components
 * with the Next.js Link component.
 * Normally the Next.js Link is used with an <a> like this:
 *
 * <Link href="/something"><a>my link</a></Link>
 *
 * but I want to use styled-components to style the <a> so I replaced <a> with a
 * <A> where A is a styled-component:
 *
 * const A = styled.a`color: white;`;
 *
 * but when the child of <Link> is not an <a>, the href is not copied to the child.
 * See https://github.com/zeit/next.js/blob/12f423faf9710ab88c33305b0ebea70cb83f50be/lib/link.js#L120-L123
 *
 * This component adds the href so I don't have to specify it in 2 places.
 */
const Link = ({ children, href }: Props) => {
  const child = React.Children.only(children);
  return <NextLink href={href}>{React.cloneElement(child, { href })}</NextLink>;
};

export default Link;
