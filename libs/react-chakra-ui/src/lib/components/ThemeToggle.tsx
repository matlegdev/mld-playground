import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { ColorMode } from '@chakra-ui/color-mode/dist/types/color-mode.utils';
import { useState } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

function getLabel(props: ThemeToggleProps, colorMode: ColorMode, nextState = false): string {
  if (props?.getLabel != null) {
    return props.getLabel(colorMode, nextState);
  }

  if (props?.label != null) {
    return props.label;
  }

  if (nextState) {
    colorMode = colorMode === 'dark' ? 'light' : 'dark';
  }
  return `Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`;
}

export interface ThemeToggleProps {
  /** Override for the icon size. */
  iconSize?: number;
  /** Static override for the icon label. */
  label?: string;
  /** Dynamic override for the icon label. Prioritized over static label if both are set. */
  getLabel?: (colorMode: string, nextState?: boolean) => string;
}

export const ThemeToggle = (props: ThemeToggleProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [label, setLabel] = useState<string>(() => getLabel(props, colorMode));

  const updateTheme = () => {
    toggleColorMode();
    setLabel(getLabel(props, colorMode, true));
  };

  return (
    <Tooltip label={label}>
      <IconButton
        aria-label={label}
        icon={colorMode === 'dark' ? <SunIcon size={props.iconSize ?? 18} /> : <MoonIcon h={props.iconSize ?? 18} />}
        onClick={updateTheme}
      />
    </Tooltip>
  );
};
