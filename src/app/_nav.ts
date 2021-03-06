interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Relatórios',
    url: '/dashboard',
    badge: {
      variant: 'info',
      text: 'IMD/UFRN'
    }
  },
  {
    title: true,
    name: 'Menu'
  },
  {
    name: 'Painel de Controle',
    url: '/painelControle',
    icon: 'icon-settings',
    children: [
      {
        name: 'Usuário',
        url: '/painelControle/usuario',
        icon: 'icon-user'
      },
      {
        name: 'Perfil',
        url: '/painelControle/perfil',
        icon: 'icon-user'
      },
      {
        name: 'Atividade',
        url: '/painelControle/atividade',
        icon: 'icon-user'
      },
      {
        name: 'Log',
        url: '/painelControle/log',
        icon: 'icon-user'
      },
    ]
  },
  {
    name: 'Relatórios',
    url: '/relatorio',
    icon: 'icon-file',
    children: [
      {
        name: 'Meus relatórios',
        url: '/relatorio/relatorio',
        icon: 'icon-user'
      },

    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Opçoes',
  },
  {
    name: 'Sair',
    url: '/sair',
    icon: 'icon-logout'
  },
 
];
