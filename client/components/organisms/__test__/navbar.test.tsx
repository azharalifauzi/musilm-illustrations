import { Navbar } from 'components';
import * as nextRouter from 'next/router';
import { render, screen } from 'utils';

// @ts-ignore
nextRouter.useRouter = jest.fn();

describe('Navbar Component', () => {
  it('shoud render brand logo with text muslim illustrations', () => {
    // @ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({ asPath: '/' }));

    render(<Navbar />);

    const textBrand = screen.getByText(/Muslim Illustrations/i);
    const logo = screen.getByTestId(/logo muslim illustrations/i);

    expect(textBrand).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });

  it('should render illustrations and search link', () => {
    // @ts-ignore
    nextRouter.useRouter.mockImplementation(() => ({ asPath: '/' }));

    render(<Navbar />);

    const illustrations = screen.getByTestId('illustrations-link');
    const search = screen.getByText(/search/i);

    expect(illustrations).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });
});
