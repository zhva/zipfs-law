"use client";

import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { usePathname } from 'next/navigation'

export const Header = () => {
    const pathname = usePathname()
    const routes = [
        { route: "/", linkText: "Home" },
        { route: "/dashboard", linkText: "Dashboard" },
    ];

    return (
        <StyledHeader>
            <Nav>
                <LinksWrapper>
                    {routes.map((route, index) => (
                        <LinkWrapper key={index}>
                            <StyledLink href={route.route} passHref>
                                <LinkText $isActive={pathname === route.route}>{route.linkText}</LinkText>
                            </StyledLink>
                        </LinkWrapper>
                    ))}
                </LinksWrapper>
            </Nav>
        </StyledHeader>
    );
};


const StyledHeader = styled.header`
    padding: var(--spacing-s15) var(--spacing-s30);
    background: var(--accent-blue);
`;

const Nav = styled.nav`
    width: 100%;
    color: var(--text-color);
`;

const LinksWrapper = styled.ul`
    display: flex;
    gap: var(--spacing-s30);
    margin: 0;
    padding: 0;
    list-style: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;

    &:active {
        color: var(--primary);
    }
`;

const LinkWrapper = styled.li`
    position: relative;

    &:hover {
        ${StyledLink} {
            text-decoration: underline;
            color: var(--primary);
        }
    }
`;

const LinkText = styled.span<{$isActive: boolean}>`
    margin-right: var(--spacing-s15);
    font-family: 'Oxanium';
    color: ${(props) => props.$isActive ? 'var(--primary)' : 'inherit'};
`;
