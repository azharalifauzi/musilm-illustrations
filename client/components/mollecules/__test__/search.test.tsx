import { Search } from 'components';
import { fireEvent, render, screen } from 'utils';

describe('Search Component', () => {
  it('has correct value onChange', () => {
    render(<Search />);

    const Input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(Input, { target: { value: 'halo' } });

    expect(Input).toBeInTheDocument();
    expect(Input.value).toEqual('halo');
  });

  it('shows suggestion on focus and the has length more than one', () => {
    const handleChange = jest.fn();

    render(<Search onChange={handleChange} value="halo" suggestions={[{ query: 'halo there' }]} />);

    const Input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(Input, { target: { value: 'halo' } });
    fireEvent.focus(Input);

    const Suggestions = screen.getByText(/halo there/i);

    expect(Suggestions).toBeInTheDocument();
  });

  it("shows 'no suggestion show up, just search it anyway :)' when no suggestions provided", () => {
    const handleChange = jest.fn();

    render(<Search onChange={handleChange} value="halo there" />);

    const Input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.focus(Input);

    const Suggestions = screen.getByText(/no suggestion show up, just search it anyway/i);

    expect(Suggestions).toBeInTheDocument();
  });

  it('close the suggestion on blur', () => {
    const handleChange = jest.fn();

    render(<Search value="dang" onChange={handleChange} suggestions={[{ query: 'halo there' }]} />);

    const Input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.blur(Input);

    const Suggestions = screen.queryAllByText(/halo there/i);

    expect(Suggestions.length).toEqual(0);
  });

  it('close the suggestion when length is zero', () => {
    const handleChange = jest.fn();

    render(<Search onChange={handleChange} value="" suggestions={[{ query: 'halo there' }]} />);

    const Suggestions = screen.queryAllByText(/halo there/i);

    expect(Suggestions.length).toEqual(0);
  });

  it('trigger click event when suggestion clicked', () => {
    const handleChange = jest.fn();
    const handleClick = jest.fn();

    render(
      <Search
        value="dang"
        onChange={handleChange}
        suggestions={[{ query: 'halo', onClick: handleClick }]}
      />
    );
    const Input = screen.getByRole('textbox');

    fireEvent.focus(Input);

    const Suggestions = screen.getByText(/halo/i);

    fireEvent.click(Suggestions);

    expect(handleClick).toHaveBeenCalled();
  });
});
