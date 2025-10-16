import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  token: string;
}

const AddressAutocomplete = ({ value, onChange, token }: AddressAutocompleteProps) => {
  return (
    <AddressSuggestions
      token={token}
      value={value}
      onChange={(suggestion) => {
        if (suggestion?.value) {
          onChange(suggestion.value);
        }
      }}
      inputProps={{
        placeholder: 'Начните вводить адрес...',
        className: 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      }}
      containerClassName="w-full"
      suggestionsClassName="absolute z-50 max-h-60 w-full overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
      suggestionClassName="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      currentSuggestionClassName="bg-accent text-accent-foreground"
    />
  );
};

export default AddressAutocomplete;
