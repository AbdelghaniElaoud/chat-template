import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
// Menu
export interface Menu {
  headTitle?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeValue?: string;
  badgeClass?: string;
  badgeText?: string;
  active?: boolean;
  selected?: boolean;
  bookmark?: boolean;
  children?: Menu[];
  children2?: Menu[];
  Menusub?: boolean;
  target?: boolean;
  menutype?:string
}

@Injectable({
  providedIn: 'root',
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );

  // Search Box
  public search = false;

  // Language
  public language = false;

  // Mega Menu
  public megaMenu = false;
  public levelMenu = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen = false;
  active: any;

  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {
    this.unsubscriber.next;
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS: Menu[] = [
    // Dashboard
    { headTitle: 'MAIN' },
    {
      title: 'Dashboards',
      icon: 'home',
      type: 'sub',
      badgeClass:'warning',
      badgeText:'warning',
      badgeValue:'12',
      selected : false,
      active: false,
      children: [
        { path: '/dashboard/crm', title: 'CRM', type: 'link' },
        { path: '/dashboard/ecommerce', title: 'Ecommerce', type: 'link' },
        { path: '/dashboard/crypto', title: 'Crypto', type: 'link' },
        { path: '/dashboard/jobs', title: 'Jobs', type: 'link' },
        { path: '/dashboard/nft', title: 'NFT', type: 'link' },
        { path: '/dashboard/sales', title: 'Sales', type: 'link' },
        { path: '/dashboard/analytics', title: 'Analytics', type: 'link' },
        { path: '/dashboard/projects', title: 'Projects', type: 'link' },
        { path: '/dashboard/hrm', title: 'HRM', type: 'link' },
        { path: '/dashboard/stocks', title: 'Stocks', type: 'link' },
        { path: '/dashboard/courses', title: 'Courses', type: 'link' },
        { path: '/dashboard/personal', title: 'Personal', type: 'link' },
      ],
    },
 
    { headTitle: 'PAGES' },
    {
      title: 'Pages',
      type: 'sub',
      active: false,
      selected : false,
      icon: 'file-blank',
      badgeClass: 'secondary',
      badgeText: 'secondary',
      badgeValue: 'New',
      children: [
        {
          path: '/pages/aboutus',
          title: 'About Us',
          type: 'link',
          active: false,
        },
        {
          title: 'Blog',
          type: 'sub',
          active: false,
          selected : false,
          children: [
            {
              path: '/pages/blog/blog',
              title: 'Blog',
              type: 'link',
            },
            {
              path: '/pages/blog/blog-details',
              title: 'Blog Details',
              type: 'link',
            },
            {
              path: '/pages/blog/create-blog',
              title: 'Create Blog',
              type: 'link',
            },
          ],
        },
        {
          path: '/pages/chat',
          title: 'Chat',
          type: 'link',
        },
        {
          path: '/pages/contacts',
          title: 'Contacts',
          type: 'link',
        },
        {
          path: '/pages/contactus',
          title: 'Contactus',
          type: 'link',
        },
        {
          title: 'Ecommerce',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/pages/ecommerce/addproduct',
              title: 'Add Products',
              type: 'link',
            },

            {
              path: '/pages/ecommerce/cart',
              title: 'Cart',
              type: 'link',
            },
            {
              path: '/pages/ecommerce/checkout',
              title: 'Checkout',
              type: 'link',
            },
            {
              path: '/pages/ecommerce/editproducts',
              title: 'Edit products',
              type: 'link',
            },
            {
              path: '/pages/ecommerce/orderdetails',
              title: 'Order Details',
              type: 'link',
            },
            {
              path: '/pages/ecommerce/orders',
              title: 'Orders',
              type: 'link',
            },
            {
              path: '/pages/ecommerce/products',
              title: 'Products',
              type: 'link',
            },
            {
              path: '/pages/ecommerce/product-details',
              title: 'Product Details',
              type: 'link',
            },
            {
              path: '/pages/ecommerce/products-list',
              title: 'ProductsList',
              type: 'link',
            },
            {
              path: '/pages/ecommerce/wishlist',
              title: 'Wishlist',
              type: 'link',
            },
          ],
        },
        {
          title: 'Email',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/pages/email/mailapp',
              title: 'Mail app',
              type: 'link',
            },
            {
              path: '/pages/email/mailsettings',
              title: 'mail-settings',
              type: 'link',
            },
          ],
        },
        {
          path: '/pages/emptypage',
          title: 'Empty',
          type: 'link',
        },
        {
          path: '/pages/faqs',
          title: 'FAQS',
          type: 'link',
        },
        {
          title: 'File Manger',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/pages/filemanager/filemanager',
              title: 'File Manger',
              type: 'link',
            },
          ],
        },
        {
          title: 'Invoice',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/pages/invoice/create-invoice',
              title: 'Create Invoice',
              type: 'link',
            },
            {
              path: '/pages/invoice/invoice-details',
              title: 'Invoice Details',
              type: 'link',
            },
            {
              path: '/pages/invoice/invoice-list',
              title: 'Invoice List',
              type: 'link',
            },
          ],
        },
        {
          path: '/pages/landing',
          title: 'Landing',
          type: 'link',
        },
        {
          path: '/pages/jobs-landing',
          title: 'Jobs Landing',
          type: 'link',
        },
        {
          path: '/pages/notifications',
          title: 'Notification',
          type: 'link',
        },
        {
          path: '/pages/pricing',
          title: 'Pricing',
          type: 'link',
        },
        {
          path: '/pages/profile',
          title: 'Profile',
          type: 'link',
        },
        {
          path: '/pages/reviews',
          title: 'Reviews',
          type: 'link',
        },
        {
          path: '/pages/team',
          title: 'Team',
          type: 'link',
        },
        {
          path: '/pages/terms-conditions',
          title: 'Terms & Conditions',
          type: 'link',
        },
        {
          path: '/pages/timeline',
          title: 'Timeline',
          type: 'link',
        },
        {
          path: '/pages/todolist',
          title: 'To Do List',
          type: 'link',
        },
      ],
    },
    {
      title: 'Task',
      type: 'sub',
      badgeClass: 'secondary',
      badgeText: 'secondary',
      icon: 'task',
      badgeValue: 'New',
      active: false,
      children: [
        {
          path: '/task/kanbanboard',
          title: 'Kanban Board',
          type: 'link',
        },
        {
          path: '/task/list-view',
          title: 'List view',
          type: 'link',
        },
        {
          path: '/task/task-details',
          title: 'Task Details',
          type: 'link',
        },
      ],
    },

    {
      title: 'Authentication',
      type: 'sub',
      icon: 'fingerprint',
      selected : false,
      active: false,
      children: [
        {
          path: '/authentication/commingsoon',
          title: 'Comming Soon',
          type: 'link',
        },
        {
          title: 'Create Password',
          type: 'sub',
          active: false,
          children: [
            {
              path: 'authentication/create-password/basic',
              title: 'Basic',
              type: 'link',
            },
            {
              path: 'authentication/create-password/cover',
              title: 'Cover',
              type: 'link',
            },
          ],
        },
        {
          title: 'Lock Screen',
          type: 'sub',
          active: false,
          children: [
            {
              path: 'authentication/lock-screen/basic',
              title: 'Basic',
              type: 'link',
            },
            {
              path: 'authentication/lock-screen/cover',
              title: 'Cover',
              type: 'link',
            },
          ],
        },
        {
          title: 'Reset Password',
          type: 'sub',
          active: false,
          children: [
            {
              path: 'authentication/reset-password/basic',
              title: 'Basic',
              type: 'link',
            },
            {
              path: 'authentication/reset-password/cover',
              title: 'cover',
              type: 'link',
            },
          ],
        },
        {
          title: 'Sign In',
          type: 'sub',
          active: false,
          children: [
            {
              path: 'authentication/sign-in/basic',
              title: 'Basic',
              type: 'link',
            },
            {
              path: 'authentication/sign-in/cover',
              title: 'Cover',
              type: 'link',
            },
          ],
        },
        {
          title: 'Sign Up',
          type: 'sub',
          active: false,
          children: [
            {
              path: 'authentication/sign-up/basic',
              title: 'Basic',
              type: 'link',
            },
            {
              path: 'authentication/sign-up/cover',
              title: 'Cover',
              type: 'link',
            },
          ],
        },
        {
          title: 'Two-Step Verification',
          type: 'sub',
          active: false,
          children: [
            {
              path: 'authentication/twostep-verification/basic',
              title: 'Basic',
              type: 'link',
            },
            {
              path: 'authentication/twostep-verification/cover',
              title: 'Cover',
              type: 'link',
            },
          ],
        },
        {
          title: 'Under Maintainance',
          path: '/authentication/under-maintainance',
          type: 'link',
        },
      ],
    },

    {
      title: 'Error',
      type: 'sub',
      icon: 'error',
      active: false,
      children: [
        {
          path: 'error/error401',
          title: 'Error401',
          type: 'link',
        },
        {
          path: 'error/error404',
          title: 'Error404',
          type: 'link',
        },
        {
          path: 'error/error500',
          title: 'error500',
          type: 'link',
        },
      ],
    },
    { headTitle: 'GENERAL' },
    {
      title: 'UI Elements',
      type: 'sub',
      icon: 'box',
      active: false,
      menutype:'mega-menu',
      children: [
        {
          path: '/uielements/alerts',
          title: 'Alerts',
          type: 'link',
        },
        {
          path: '/uielements/badge',
          title: 'Badge',
          type: 'link',
        },
        {
          path: '/uielements/breadcrumb',
          title: 'Breadcrumb',
          type: 'link',
        },
        {
          path: '/uielements/buttongroup',
          title: 'Button Group',
          type: 'link',
        },
        {
          path: '/uielements/buttons',
          title: 'Buttons',
          type: 'link',
        },
       
        {
          path: '/uielements/cards',
          title: 'Cards',
          type: 'link',
        },
        {
          path: '/uielements/dropdowns',
          title: 'DropDown',
          type: 'link',
        },
        {
          path: '/uielements/images-figures',
          title: 'Images Figures',
          type: 'link',
        },
        {
          path: '/uielements/listgroup',
          title: 'ListGroup',
          type: 'link',
        },
        {
          path: '/uielements/navtabs',
          title: 'Navs & Tabs',
          type: 'link',
        },
        {
          path: '/uielements/objectfit',
          title: 'ObjectFit',
          type: 'link',
        },
        {
          path: '/uielements/pagination',
          title: 'Pagination',
          type: 'link',
        },
        {
          path: '/uielements/popovers',
          title: 'Popovers',
          type: 'link',
        },
        {
          path: '/uielements/progress',
          title: 'Progress',
          type: 'link',
        },
        {
          path: '/uielements/indicators',
          title: 'Indicators',
          type: 'link',
        },
        {
          path: '/uielements/spinners',
          title: 'Spinners',
          type: 'link',
        },
        {
          path: '/uielements/toasts',
          title: 'Toasts',
          type: 'link',
        },
        {
          path: '/uielements/tooltips',
          title: 'ToolTip',
          type: 'link',
        },
       
      ],
    },
    {
      title: 'Utilites',
      type: 'sub',
      icon: 'medal',
      active: false,
      children: [
        {
          path: '/utilities/avatars',
          title: 'Avatars',
          type: 'link',
        },
        {
          path: '/utilities/borders',
          title: 'Borders',
          type: 'link',
        },
    
        {
          path: '/utilities/colors',
          title: 'Colors',
          type: 'link',
        },
        {
          path: '/utilities/columns',
          title: 'Columns',
          type: 'link',
        },
        {
          path: '/utilities/flex',
          title: 'Flex',
          type: 'link',
        },
      
    
        {
          path: '/utilities/grids',
          title: 'Grids',
          type: 'link',
        },
       
      ],
    },
    {
      title: 'Forms',
      type: 'sub',
      icon: 'file',
      active: false,
      children: [
        {
          title: 'Form Elements',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/form/forms-elements/inputs',
              title: 'Inputs',
              type: 'link',
            },
            {
              path: '/form/forms-elements/checksradios',
              title: 'Check & Radios',
              type: 'link',
            },
            {
              path: '/form/forms-elements/inputgroup',
              title: 'Input Group',
              type: 'link',
            },
            {
              path: '/form/forms-elements/formselect',
              title: 'Form Select',
              type: 'link',
            },
            {
              path: '/form/forms-elements/rangeslider',
              title: 'Range Slider',
              type: 'link',
            },
       
            {
              path: '/form/forms-elements/fileuploads',
              title: 'File Uploads',
              type: 'link',
            },
            {
              path: '/form/forms-elements/datetimepicker',
              title: 'Date Time Picker',
              type: 'link',
            },
            {
              path: '/form/forms-elements/colorpicker',
              title: 'Color pickers',
              type: 'link',
            },
          ],
        },
       
        {
          path: '/forms/form-layouts',
          title: 'Form Layouts',
          type: 'link',
        },
        {
          title: 'Form Editors',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/form/form-editor/quill-editor',
              title: 'Quill Editor',
              type: 'link',
            },
          ],
        },
        {
          path: '/forms/validation',
          title: 'Validation',
          type: 'link',
        },
        {
          path: '/forms/select2',
          title: 'select2',
          type: 'link',
        },
      ],
    },
    {
      title: 'Advanced Ui',
      type: 'sub',
      icon: 'party ',
      active: false,
      children: [
        {
          path: '/advancedui/accordions',
          title: 'Accordions & Collapse',
          type: 'link',
        },
    
        {
          path: '/advancedui/draggable-cards',
          title: 'Draggable Cards',
          type: 'link',
        },
        {
          path: '/advancedui/modals',
          title: 'Models & Closes',
          type: 'link',
        },
        {
          path: '/advancedui/navbar',
          title: 'Navbar',
          type: 'link',
        },
        {
          path: '/advancedui/offcanvas',
          title: 'OffcCanvas',
          type: 'link',
        },
        {
          path: '/advancedui/rating',
          title: 'Rating',
          type: 'link',
        },
        {
          path: '/advancedui/scrollspy',
          title: 'Scrollspy',
          type: 'link',
        },
        {
          path: '/advancedui/swiperjs',
          title: 'SwiperJs',
          type: 'link',
        },
      ],
    },
    {
      icon: 'gift',
      title: 'Widgets',
      path: '/widgets',
      type: 'link',
      badgeClass: 'danger',
      badgeText: 'danger',
      badgeValue: 'Hot',
    },
    { headTitle: 'WEBAPPS' },
    {
      title: 'Apps',
      type: 'sub',
      icon: 'grid-alt',
      badgeClass: 'secondary',
      badgeText: 'secondary',
      badgeValue: 'New',
      active: false,
      children: [
        {
          path: '/apps/fullcalender',
          title: 'Full Calender',
          type: 'link',
        },
        {
          path: '/apps/gallery',
          title: 'Gallery',
          type: 'link',
        },
   
        {
          title: 'Projects',
          type: 'sub',
          badgeClass: 'secondary',
          badgeText: 'secondary',
          badgeValue: 'New',
          active: false,
          children: [
            {
              path: '/apps/projects/projectlist',
              title: 'Project List',
              type: 'link',
            },
            {
              path: '/apps/projects/project-overview',
              title: 'Project Overview',
              type: 'link',
            },
            {
              path: '/apps/projects/create-project',
              title: 'Create Project',
              type: 'link',
            },
          ],
        },
        {
          title: 'Jobs',
          type: 'sub',
          badgeClass: 'badge bg-secondary-transparent',
          badgeValue: 'New',
          active: false,
          children: [
            {
              path: '/apps/jobs/job-details',
              title: 'Job Details',
              type: 'link',
            },
            {
              path: '/apps/jobs/search-company',
              title: 'Search Company',
              type: 'link',
            },
            {
              path: '/apps/jobs/search-jobs',
              title: 'Search Jobs',
              type: 'link',
            },
            {
              path: '/apps/jobs/job-post',
              title: 'Job Post',
              type: 'link',
            },
            {
              path: '/apps/jobs/jobs-list',
              title: 'Jobs List',
              type: 'link',
            },
            {
              path: '/apps/jobs/search-candidate',
              title: 'Search Candidate',
              type: 'link',
            },
            {
              path: '/apps/jobs/candidate-details',
              title: 'Candidate Details',
              type: 'link',
            },
          ],
        },
        {
          title: 'NFT',
          type: 'sub',
          badgeClass: 'badge bg-secondary-transparent',
          badgeValue: 'New',
          active: false,
          children: [
            {
              path: '/apps/nft/market-place',
              title: 'Market place',
              type: 'link',
            },
            {
              path: '/apps/nft/nft-details',
              title: 'NFT Details',
              type: 'link',
            },
            {
              path: '/apps/nft/create-nft',
              title: 'Create NFT',
              type: 'link',
            },
            {
              path: '/apps/nft/wallet-integration',
              title: 'Wallet Integration',
              type: 'link',
            },
            {
              path: '/apps/nft/live-auction',
              title: 'Live auction',
              type: 'link',
            },
          ],
        },
        {
          title: 'CRM',
          type: 'sub',
          badgeClass: 'badge bg-secondary-transparent',
          badgeValue: 'New',
          active: false,
          children: [
            {
              path: '/apps/crm/contacts',
              title: 'Contacts',
              type: 'link',
            },
            {
              path: '/apps/crm/companies',
              title: 'Companies',
              type: 'link',
            },
            {
              path: '/apps/crm/deals',
              title: 'Deals',
              type: 'link',
            },
            {
              path: '/apps/crm/leads',
              title: 'Leads',
              type: 'link',
            },
          ],
        },
        {
          title: 'Crypto',
          type: 'sub',
          badgeClass: 'badge bg-secondary-transparent',
          badgeValue: 'New',
          active: false,
          children: [
            {
              path: '/apps/crypto/transactions',
              title: 'Transactions',
              type: 'link',
            },
            {
              path: '/apps/crypto/currency-exchange',
              title: 'Currency Exchange',
              type: 'link',
            },
            {
              path: '/apps/crypto/buy-sell',
              title: 'Buy & Sell',
              type: 'link',
            },
            {
              path: '/apps/crypto/marketcap',
              title: 'Marketcap',
              type: 'link',
            },
            {
              path: '/apps/crypto/wallet',
              title: 'Wallet',
              type: 'link',
            },
          ],
        },
      ],
    },
    {
      title: 'Nested Menu',
      icon: 'layer',
      type: 'sub',
      active: false,
      children: [
        {
          title: 'Nested-1',

          type: 'link',
          active: false,
        },
        {
          title: 'Nested-2',
          type: 'sub',
          active: false,
          children: [
            {  
              title: 'Nested-2-1',
              type: 'link',
              active: false,
            },
            {
              title: 'Nested-2-2',
              type: 'link',
              active: false,
            },
            {
              title: 'Nested-2-3',
              type: 'sub',
              active: false,
              children: [
                {
                  title: 'Nested-2-3-1',
                  type: 'link',
                  active: false,
                },
                {
                  title: 'Nested-2-3-2',
                  type: 'link',
                  active: false,
                },
                {
                  title: 'Nested-2-3-3',
                  type: 'link',
                  active: false,
                },
              ],
            },
          ],
        },
      ],
    },
    { headTitle: 'TABLES&CHARTS' },
    {
      title: 'Tables',
      type: 'sub',
      icon: 'table',
      badgeClass: 'success',
      badgeText: 'success',
      badgeValue: '3',
      active: false,
      children: [
        {
          path: '/tables/tables',
          title: 'Tables',
          type: 'link',
        },
        {
          path: '/tables/gridjs-tables',
          title: 'GridJs Tables',
          type: 'link',
        },
        {
          path: '/tables/data-tables',
          title: 'Data Tables',
          type: 'link',
        },
      ],
    },
    {
      title: 'Charts',
      type: 'sub',
      icon: 'bar-chart-square',
      active: false,
      children: [
        {
          title: 'Apex Charts',
          type: 'sub',
          active: false,
          children: [
            {
              path: '/charts/apex-charts/line-charts',
              title: 'Line Charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/area-charts',
              title: 'Area Charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/bar-charts',
              title: 'Bar Charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/column-charts',
              title: 'Column-Charts',
              type: 'link',
            },

            {
              path: '/charts/apex-charts/mixedcharts',
              title: 'Mixed charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/rangeareacharts',
              title: 'Range Area Charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/timelinecharts',
              title: 'TimeLine Charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/candlestickcharts',
              title: 'CandleStick Charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/boxplotcharts',
              title: 'BoxPlot Charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/bubblecharts',
              title: 'Bubble charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/scattercharts',
              title: 'Scatter Charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/heatmapcharts',
              title: 'Heatmap Charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/treemapcharts',
              title: 'TreeMap Charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/piecharts',
              title: 'Pie Charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/radialbarcharts',
              title: 'Radialbar Charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/radarcharts',
              title: 'Radbar Charts',
              type: 'link',
            },
            {
              path: '/charts/apex-charts/polarareacharts',
              title: 'Polararea Charts',
              type: 'link',
            },
          ],
        },
        {
          path: '/charts/chartjs',
          title: 'Chartjs',
          type: 'link',
        },
        {
          path: '/charts/echart',
          title: 'Echart',
          type: 'link',
        },
      ],
    },
    { headTitle: 'MAPS&ICONS' },
    {
      title: 'Maps',
      type: 'sub',
      icon: 'map',
      active: false,
      children: [
      
        {
          path: 'maps/leafletmaps',
          title: 'Leaflet Maps',
          type: 'link',
        },
        
      ],
    },
    {
      icon: 'store-alt',
      path: 'icons',
      title: 'Icons',
      type: 'link',
    },
  ];

  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
