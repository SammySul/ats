export interface At {
  abbreviation: string;
  name: string;
  pattern: string;
  isActive: boolean;
  isIncognito: boolean;
  default?: string;
  // favico: string; //http://www.google.com/s2/favicons?domain=...
}

export const defaultAts: At[] = [
  {
    abbreviation: 'gt',
    name: 'Google Translate',
    pattern: 'https://translate.google.com/?sl=auto&tl=en&text=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://translate.google.com/?sl=auto&tl=en&text=@@@',
  },
  {
    abbreviation: 'x',
    name: 'X',
    pattern: 'https://twitter.com/search?q=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://twitter.com/search?q=@@@',
  },
  {
    abbreviation: 'issue',
    name: 'YouTrack Issue',
    pattern: 'https://traperto.youtrack.cloud/issue/@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://traperto.youtrack.cloud/issue/@@@',
  },
  {
    abbreviation: 'nc',
    name: 'Namecheap',
    pattern:
      'https://www.namecheap.com/domains/registration/results/?domain=@@@',
    isActive: true,
    isIncognito: false,
    default:
      'https://www.namecheap.com/domains/registration/results/?domain=@@@',
  },
  {
    abbreviation: 'r',
    name: 'Reddit',
    pattern: 'https://www.reddit.com/search?q=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://www.reddit.com/search?q=@@@',
  },
  {
    abbreviation: 'gm',
    name: 'Gmail',
    pattern: 'https://mail.google.com/mail/u/0/#search/@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://mail.google.com/mail/u/0/#search/@@@',
  },
  {
    abbreviation: 'steam',
    name: 'Steam',
    pattern: 'https://store.steampowered.com/search/?term=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://store.steampowered.com/search/?term=@@@',
  },
  {
    abbreviation: 'nf',
    name: 'Netflix',
    pattern: 'https://www.netflix.com/search?q=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://www.netflix.com/search?q=@@@',
  },
  {
    abbreviation: 'tw',
    name: 'Twitch',
    pattern: 'https://www.twitch.tv/search?term=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://www.twitch.tv/search?term=@@@',
  },
  {
    abbreviation: 'gh',
    name: 'GitHub',
    pattern: 'https://github.com/search?q=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://github.com/search?q=@@@',
  },
  {
    abbreviation: 'so',
    name: 'Stack Overflow',
    pattern: 'https://stackoverflow.com/search?q=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://stackoverflow.com/search?q=@@@',
  },
  {
    abbreviation: 'ddg',
    name: 'DuckDuckGo',
    pattern: 'https://duckduckgo.com/?q=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://duckduckgo.com/?q=@@@',
  },
  {
    abbreviation: 'az',
    name: 'Amazon',
    pattern: 'https://www.amazon.de/s?k=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://www.amazon.de/s?k=@@@',
  },
  {
    abbreviation: 'gr',
    name: 'Goodreads',
    pattern: 'https://www.goodreads.com/search?q=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://www.goodreads.com/search?q=@@@',
  },
  {
    abbreviation: 'b',
    name: 'Bing',
    pattern: 'https://www.bing.com/search?q=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://www.bing.com/search?q=@@@',
  },
  {
    abbreviation: 'w',
    name: 'Wikipedia',
    pattern: 'https://en.wikipedia.org/wiki/@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://en.wikipedia.org/wiki/@@@',
  },
  {
    abbreviation: 'mal',
    name: 'MyAnimeList',
    pattern: 'https://myanimelist.net/search/all?q=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://myanimelist.net/search/all?q=@@@',
  },
  {
    abbreviation: 'gsc',
    name: 'Google Scholar',
    pattern: 'https://scholar.google.com/scholar?q=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://scholar.google.com/scholar?q=@@@',
  },
  {
    abbreviation: 'yt',
    name: 'YouTube',
    pattern: 'https://www.youtube.com/results?search_query=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://www.youtube.com/results?search_query=@@@',
  },
  {
    abbreviation: 'ytm',
    name: 'YouTube Music',
    pattern: 'https://music.youtube.com/search?q=@@@',
    isActive: true,
    isIncognito: false,
    default: 'https://music.youtube.com/search?q=@@@',
  },
];
