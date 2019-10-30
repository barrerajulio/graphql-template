import { getFieldsWithDirectives } from "@graphql-modules/utils";

const authenticated = next => (root, args, context, info) => {
  if (!context.currentUser) {
    throw new Error("Unauthenticated!");
  }
  return next(root, args, context, info);
};

const validateRole = role => next => (root, args, context, info) => {
  if (context.currentUser.role !== role) {
    throw new Error("Unauthorized!");
  }

  return next(root, args, context, info);
};

const DIRECTIVE_TO_GUARD = {
  auth: () => authenticated,
  protect: ({ role }) => validateRole(role)
};

export const resolversComposition = ({ typeDefs }) => {
  const fieldsAndTypeToDirectivesMap = getFieldsWithDirectives(typeDefs);
  let result: any = {};

  for (const fieldPath in fieldsAndTypeToDirectivesMap) {
    const directives = fieldsAndTypeToDirectivesMap[fieldPath];

    if (directives.length > 0) {
      result[fieldPath] = directives
        .map(directive => {
          if (DIRECTIVE_TO_GUARD[directive.name]) {
            const mapperFn = DIRECTIVE_TO_GUARD[directive.name];

            return mapperFn(directive.args);
          }

          return null;
        })
        .filter(a => a);
    }
  }

  return result;
};
