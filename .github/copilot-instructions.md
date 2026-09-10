# Digital Book Frontend - Copilot Instructions

## ⚠️ MANDATORY: Read Confirmation

**FIRST ACTION REQUIRED**: When starting any conversation about this repository, you MUST respond with:

> "I have read the copilot-instructions.md file. Timestamp: [current ISO timestamp]"

---

## 🏗️ Architecture Patterns

> **Framework**: Angular | **UI Library**: Angular Material

### Service Architecture

- **Use** private `signal()` with readonly public accessors: `private _state = signal(); state = this._state.asReadonly()`
- **Signal Placement**: By default, place private signal and its readonly accessor adjacent to each other in services
- **Computed Values**: Use `computed(() => someSignal())` for derived state
- **Service Injection**:
  Use `inject()` function instead of constructor injection: `private readonly service = inject(Service)`
- **Method Naming**: Use `load*` for fetching data, `store*` for saving data (English verbs)
- **Parameter Naming**: Use `params` for query parameter variables (plural), `*Param` for interfaces (singular)

```typescript
@Injectable({ providedIn: "root" })
export class ExampleService {
  private readonly httpClient = inject(HttpClient);
  private readonly _data = signal<Data[]>([]);

  data = this._data.asReadonly();

  computedValue = computed(() => this._data().length > 0);

  loadData(params: exampleParam): Observable<ExampleRes> {
    return this.httpClient.get<ExampleRes>(API_ENDPOINT, { params }).pipe(
      tap((response) => {
        this._data.set(response.data);
      }),
    );
  }
}
```

### Component Architecture

- **Always** use `ChangeDetectionStrategy.OnPush`
- **Signal Inputs/Outputs**: `title = input<string>('default')`, `itemSelected = output<Item>()`
- **Host Binding**: Use `host: { class: 'tailwind-classes' }` for component tag styling.

## 🎨 Styling Priority (Critical)

1. **Angular Material**

- First we will check if we can find a good solution for UI Component from
  [Angular Material Component](https://material.angular.dev/components/categories)
- To update the default style of an angular material component we will mixins and tokens.
  for example: [Button Styling](https://material.angular.dev/components/button/styling)

2. **Tailwind CSS**

- We will use utility classes from [Tailwind](https://tailwindcss.com/docs/installation/using-vite)
  for layout, spacing, flex, sizing, grid, typography etc.
- **Exception - Component Grid Layout**: For controlled, responsive multi-column layouts, prefer a
  component SCSS grid (using the `respond()` mixin) over Tailwind's grid/flex utilities. Angular's
  view encapsulation scopes the class to the component, so every component grid uses the same
  standard class name `grid-dba`, regardless of component.

3. **Global, component, inline CSS**

- we have to try to omit this point. We can use them (mainly component, inline) for testing purpose when developing.
- if we have to use this approach (mainly global) we have to explain why.

### File Organization

```
TODO
```

## 🔄 Data Flow Patterns (Critical for Multi-Service Architecture)

### Service Communication & Navigation

- **Components Handle Navigation**: Components inject Router and navigate after successful service operations
- **Services Focus on Data**: Services only handle data fetching, transformation, and state management
- **Cross-Service State**: Services inject other services for computed state
- **Session Persistence**: Use `window.sessionStorage` for user state persistence
- **Signal Update Pattern**: Use `.update()` for immutable state updates: `this._state.update(curr => ({...curr, newProp: value}))`

## 🧪 Testing Standards

### **1. Focus on Actual Added Code** ✅

- Test component **behavior** and **computed properties** we actually wrote
- Test **service integration** and **business logic**, not Angular internals
- Test **user interactions** and **state changes**, not framework mechanics

### **2. Use test-utils.ts** ✅

- **Mandatory**: Use pre-configured mocks instead of creating your own
- **Consistency**: Ensures uniform mock behavior across all tests
- **Maintenance**: Centralized mock updates when services change

### **3. If possible use constants** ✅

- **Never hardcode** API endpoints or navigation paths in tests
- **Always import** from centralized constants files
- **Consistency**: Same constants used in production code and tests

## 🧪 Following Practices

TODO

## 🚀 Development Commands

TODO

## 🔧 Configuration Specifics

TODO

## 💬 Code Documentation Standards

TODO

### Comment Usage Policy (Critical)

**Default**: Do NOT add comments for generated code. Code should be self-documenting through clear naming and structure.

**Exceptions** - Add comments ONLY when:

1. **External Context**: Explaining something not visible in the code itself (business rules, API requirements, external dependencies)
2. **Rule Breaking**: Code intentionally breaks established patterns/conventions but is necessary
3. **Non-Obvious Behavior**: Complex logic that isn't immediately clear from reading the code

**When Adding Comments (Exception case)**:

- **Always notify** the user about added comments
- **Highlight the reason** using the categories above (#1, #2, #3)
- **Justify necessity** - explain why the comment is essential, in the next response to the user

```typescript
// ❌ Avoid: Explaining what code does
// Set loading to true
this.isLoading.set(true);
```

## 🤝 Change Confirmation Protocol

### Implementation Approach

- **Follow Instructions Exactly**: Always implement what the user requests
- **No Unsolicited Changes**: Do not add features, optimizations, or patterns not explicitly requested
- **Ask Before Suggesting**: If you identify potential improvements or alternative approaches, ask for permission before implementing. For example "add isLoading attribute".

```typescript
readonly isLoading = signal<boolean>(false);
```

### Before writing the code wait for Confirmation from the user For these cases:

- Alternative implementation approaches
- Additional features or optimizations
- Architectural pattern changes
- Dependencies or imports not mentioned
- Code organization different from request
