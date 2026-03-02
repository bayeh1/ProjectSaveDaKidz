import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import { homeContent } from '../../content/home';

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

describe('Home page', () => {
  it('renders the hero heading', () => {
    renderHome();
    expect(screen.getByRole('heading', { level: 1, name: homeContent.hero.heading })).toBeInTheDocument();
  });

  it('renders the hero eyebrow text', () => {
    renderHome();
    expect(screen.getByText(homeContent.hero.eyebrow)).toBeInTheDocument();
  });

  it('renders the hero subheading', () => {
    renderHome();
    expect(screen.getByText(homeContent.hero.subheading)).toBeInTheDocument();
  });

  it('renders the hero donate CTA link', () => {
    renderHome();
    const links = screen.getAllByRole('link', { name: homeContent.hero.donateCta });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', '/donate');
  });

  it('renders the hero gallery CTA link', () => {
    renderHome();
    expect(screen.getByRole('link', { name: homeContent.hero.galleryCta })).toHaveAttribute('href', '/gallery');
  });

  it('renders all 4 stats', () => {
    renderHome();
    homeContent.stats.forEach((stat) => {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });

  it('renders the mission eyebrow badge', () => {
    renderHome();
    expect(screen.getByText(homeContent.mission.eyebrow)).toBeInTheDocument();
  });

  it('renders the mission heading', () => {
    renderHome();
    expect(screen.getByText(homeContent.mission.heading)).toBeInTheDocument();
  });

  it('renders mission body paragraphs', () => {
    renderHome();
    expect(screen.getByText(homeContent.mission.body1)).toBeInTheDocument();
    expect(screen.getByText(homeContent.mission.body2)).toBeInTheDocument();
  });

  it('renders the mission CTA link', () => {
    renderHome();
    expect(screen.getByRole('link', { name: homeContent.mission.cta })).toHaveAttribute('href', '/donate');
  });

  it('renders all 4 mission card titles', () => {
    renderHome();
    homeContent.missionCards.forEach((card) => {
      expect(screen.getByText(card.title)).toBeInTheDocument();
    });
  });

  it('renders all 4 mission card descriptions', () => {
    renderHome();
    homeContent.missionCards.forEach((card) => {
      expect(screen.getByText(card.desc)).toBeInTheDocument();
    });
  });

  it('renders the gallery preview heading', () => {
    renderHome();
    expect(screen.getByText(homeContent.galleryPreview.heading)).toBeInTheDocument();
  });

  it('renders the gallery preview subheading', () => {
    renderHome();
    expect(screen.getByText(homeContent.galleryPreview.subheading)).toBeInTheDocument();
  });

  it('renders all gallery preview photos with captions', () => {
    renderHome();
    homeContent.galleryPreview.photos.forEach((photo) => {
      expect(screen.getByAltText(photo.caption)).toBeInTheDocument();
      expect(screen.getByText(photo.caption)).toBeInTheDocument();
    });
  });

  it('renders the gallery preview CTA link', () => {
    renderHome();
    expect(screen.getByRole('link', { name: homeContent.galleryPreview.cta })).toHaveAttribute('href', '/gallery');
  });

  it('renders the donate CTA section heading', () => {
    renderHome();
    expect(screen.getByText(homeContent.donateCta.heading)).toBeInTheDocument();
  });

  it('renders the donate CTA subheading', () => {
    renderHome();
    expect(screen.getByText(homeContent.donateCta.subheading)).toBeInTheDocument();
  });

  it('renders the bottom donate CTA link', () => {
    renderHome();
    expect(screen.getByRole('link', { name: homeContent.donateCta.cta })).toHaveAttribute('href', '/donate');
  });
});
