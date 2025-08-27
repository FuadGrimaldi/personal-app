"use client";
import { useState, useEffect, useCallback } from "react";
import {
  MessageCircle,
  Plus,
  X,
  User,
  Calendar,
  Send,
  ChevronDown,
  Loader2,
} from "lucide-react";
import {
  createComment,
  getAllCommentsByPortofolioId,
} from "@/services/apiComment";

interface CommentData {
  id: number;
  id_porto: number;
  fullname: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface CommentProps {
  portfolioId: string;
}

export default function Comment({ portfolioId = "5" }: CommentProps) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullname, setFullName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enhanced pagination state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const limit = 3; // Show 3 comments per page for better demo

  const fetchComments = useCallback(
    async (pageNumber: number, reset = false) => {
      if (!portfolioId) return;

      setIsLoading(true);
      setError(null);

      try {
        console.log(`Fetching comments - Page: ${pageNumber}, Reset: ${reset}`);

        const res = await getAllCommentsByPortofolioId(
          portfolioId,
          pageNumber,
          limit
        );

        const data = Array.isArray(res?.data?.comments)
          ? res.data.comments
          : [];
        const pagination = res?.data?.pagination;

        console.log("API Response:", { data, pagination });

        if (reset) {
          setComments(data);
        } else {
          setComments((prev) => {
            const existingIds = new Set(prev.map((c: CommentData) => c.id));
            const newComments = data.filter(
              (c: CommentData) => !existingIds.has(c.id)
            );
            return [...prev, ...newComments];
          });
        }

        // Update pagination info based on your backend structure
        if (pagination) {
          const hasNextPage = pagination.page < pagination.totalPages;
          setHasMore(hasNextPage);
          setTotalComments(pagination.total || 0);
        } else {
          // Fallback logic if pagination info is not provided
          setHasMore(data.length === limit);
        }

        console.log(
          `Updated state - hasMore: ${
            pagination
              ? pagination.page < pagination.totalPages
              : data.length === limit
          }, totalComments: ${pagination?.total || 0}`
        );
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to load comments. Please try again.");
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [portfolioId, limit]
  );

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setComments([]);
    setError(null);
    fetchComments(1, true);
  }, [portfolioId, fetchComments]);

  const loadMore = () => {
    if (hasMore && !isLoading) {
      const nextPage = page + 1;
      console.log(`Loading more comments - Next page: ${nextPage}`);
      setPage(nextPage);
      fetchComments(nextPage, false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmit = async () => {
    if (!fullname.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const newComment = await createComment({
        fullname,
        message: comment,
        id_porto: portfolioId,
      });

      // Add new comment to the top of the list
      setComments((prev) => [newComment.data, ...prev]);
      setTotalComments((prev) => prev + 1);

      setIsModalOpen(false);
      setFullName("");
      setComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
      setError("Failed to submit comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      setFullName("");
      setComment("");
      setError(null);
    }
  };

  const retryFetch = () => {
    setError(null);
    fetchComments(1, true);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Comment
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
            <p className="text-red-300 text-sm">{error}</p>
            <button
              onClick={retryFetch}
              className="mt-2 text-red-200 hover:text-white underline text-sm"
            >
              Try again
            </button>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 && !isLoading ? (
            <div className="text-center py-6">
              <MessageCircle className="w-20 h-20 text-white/20 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                No comments yet
              </h3>
              <p className="text-white/60 text-lg mb-8">
                Be the first to share your thoughts!
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 font-medium"
              >
                <Plus className="w-5 h-5" />
                Write First Comment
              </button>
            </div>
          ) : (
            <>
              {comments.map((commentItem, index) => (
                <div
                  key={commentItem.id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-1 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <h3 className="font-semibold text-white text-lg">
                          {commentItem.fullname}
                        </h3>
                        <div className="flex items-center gap-1 text-white/50 text-sm">
                          <Calendar className="w-4 h-4" />
                          {formatDate(commentItem.createdAt)}
                        </div>
                      </div>

                      <p className="text-white/80 leading-relaxed text-base">
                        {commentItem.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Load More Section */}
              <div className="flex flex-col items-center gap-4 ">
                {hasMore ? (
                  <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 hover:border-white/20 hover:scale-105"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="font-medium">
                          Loading more comments...
                        </span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                        <span className="font-medium">Load More Comments</span>
                        <span className="px-2 py-1 bg-white/10 rounded-full text-xs">
                          +{Math.min(limit, totalComments - comments.length)}
                        </span>
                      </>
                    )}
                  </button>
                ) : (
                  comments.length > 0 && (
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-8 h-8 text-white/40" />
                      </div>
                      <p className="text-white/60 font-medium">
                        Youve reached the end!
                      </p>
                      <p className="text-white/40 text-sm mt-1">
                        All {totalComments} comments have been loaded
                      </p>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>

        {/* Initial Loading State */}
        {isLoading && comments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-white/60 animate-spin mb-4" />
            <p className="text-white/60 text-lg">Loading comments...</p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleModalClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-scale-in">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#254d70] to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Add Comment</h3>
                      <p className="text-white/80 text-sm">
                        Share your thoughts about this project
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleModalClose}
                    disabled={isSubmitting}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200 disabled:opacity-50"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#254d70] focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Comment *
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this project..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#254d70] focus:border-transparent transition-all duration-200 resize-none text-gray-900 placeholder-gray-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={
                      isSubmitting || !fullname.trim() || !comment.trim()
                    }
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#254d70] hover:bg-[#1e3d5a] text-white rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Comment
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
