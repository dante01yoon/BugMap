// Figma instance descendants use the instance ID followed by master-node IDs.
// Preserve these IDs verbatim instead of detaching instances or rewriting exports.
export const isFigmaNodeId = value => typeof value === 'string'
  && /^(?:\d+:\d+|I\d+:\d+(?:;\d+:\d+)+)$/.test(value);
