import { Clipboard } from 'lucide-react';

const tokenPattern =
  /(\/\/.*|#.*|\/\*[\s\S]*?\*\/|`(?:\\.|[^`])*`|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\b(?:import|from|export|function|return|const|let|var|if|else|type|true|false|null|default|new|class|extends|async|await|as|require|module)\b|\b(?:React|View|Text|Image|Alert|Animated|Button|Pressable|StyleSheet|Platform|HermesInternal|NativeModules|TurboModuleRegistry|useMemo|useRef|createClient|getDefaultConfig|console|global|Boolean|ProfileCard|ProfileCardProps|ViewStyle|DeviceModule)\b|\b\d+(?:\.\d+)?\b|[{}()[\].,:;<>/=+-])/g;

function getTokenClass(token) {
  if (token.startsWith('//') || token.startsWith('#') || token.startsWith('/*')) {
    return 'code-token comment';
  }

  if (
    (token.startsWith('"') && token.endsWith('"')) ||
    (token.startsWith("'") && token.endsWith("'")) ||
    (token.startsWith('`') && token.endsWith('`'))
  ) {
    return 'code-token string';
  }

  if (/^\d/.test(token)) {
    return 'code-token number';
  }

  if (
    /^(React|View|Text|Image|Alert|Animated|Button|Pressable|StyleSheet|Platform|HermesInternal|NativeModules|TurboModuleRegistry|useMemo|useRef|createClient|getDefaultConfig|console|global|Boolean|ProfileCard|ProfileCardProps|ViewStyle|DeviceModule)$/.test(
      token
    )
  ) {
    return 'code-token component';
  }

  if (/^[{}()[\].,:;<>/=+-]$/.test(token)) {
    return 'code-token punctuation';
  }

  return 'code-token keyword';
}

function highlightCode(code) {
  const pieces = [];
  let cursor = 0;
  let tokenIndex = 0;

  for (const match of code.matchAll(tokenPattern)) {
    const token = match[0];
    const start = match.index;

    if (start > cursor) {
      pieces.push(code.slice(cursor, start));
    }

    pieces.push(
      <span className={getTokenClass(token)} key={`${token}-${tokenIndex}`}>
        {token}
      </span>
    );
    tokenIndex += 1;
    cursor = start + token.length;
  }

  if (cursor < code.length) {
    pieces.push(code.slice(cursor));
  }

  return pieces;
}

export function CodeBlock({ code, label = 'example' }) {
  const copyCode = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(code);
    }
  };

  return (
    <div className="code-frame">
      <div className="code-toolbar">
        <span>{label}</span>
        <button aria-label="复制代码" onClick={copyCode} title="复制代码" type="button">
          <Clipboard size={16} />
        </button>
      </div>
      <pre>
        <code>{highlightCode(code)}</code>
      </pre>
    </div>
  );
}
